import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { domainContainer } from '@/modules/auth/inject/inversify.config'
import { AuthorizationService } from '@/modules/auth/service/login/AuthorizationService'
import { LoginBadRequestException } from '@/modules/auth/exeptions/login/LoginBadRequestException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { LOGIN_UNAUTHORIZED_COMPONENT } from '@/modules/auth/exeptions/login/LoginUnauthorizedException'
import {
  RECOVERY_PASSWORD_COMPONENT,
  RecoveryPasswordBadRequestException
} from '@/modules/auth/exeptions/recoveryPassword/RecoveryPasswordBadRequestException'
import { RecoveryPasswordEmailValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordEmailValue'
import { RecoveryPasswordService } from '@/modules/auth/service/recoveryPassword/RecoveryPasswordService'
import { RecoveryPasswordResponseValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordResponseValue'
import { MutationPasswordResetArgs } from '@/graphql/graphql'
import { PasswordResetValue } from '@/modules/auth/values/recoveryPassword/PasswordResetValue'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

const authorizationService = domainContainer.get<AuthorizationService>(AUTH_TYPES.AuthorizationService)
const recoveryPasswordService = domainContainer.get<RecoveryPasswordService>(AUTH_TYPES.RecoveryPasswordService)

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity | null> {
  public constructor (props: AuthTokenEntity | null) {
    const id = props !== null ? props.id : undefined
    super(props, id)
  }

  public isAuth (): boolean {
    return this.props !== null
  }

  /**
   * Создать агрегат авторизация
   * @param isLoadPage загрузка странице (для реализации isRememberMe)
   */
  public static create (isLoadPage = true): Authorization {
    const tokenAuth = authorizationService.findToken()

    if (tokenAuth === null ||
      authorizationService.isClearToken(isLoadPage, tokenAuth?.isRemember ?? false)) {
      authorizationService.clearToken()

      return new Authorization(null)
    }

    if (!authorizationService.isAuth()) {
      authorizationService.setVuexToken(tokenAuth)
    }

    return new Authorization(AuthTokenEntity.create(tokenAuth).getResult())
  }

  /**
   * Записать токен в хранилище
   * @param token
   */
  public static inAuth (token: ITokenAuth | null): void {
    if (token !== null) {
      authorizationService.setLocalToken(token)
      authorizationService.setVuexToken(token)
    }
  }

  /**
   * Авторизация пользователя
   *
   * @param authorizationValue данные для авторизации
   */
  public static async auth (authorizationValue: Result<AuthorizationValue>): Promise<IUserData | null> {
    ExceptionAggregate.clear(LOGIN_UNAUTHORIZED_COMPONENT)
    if (authorizationValue.isFailure) {
      ExceptionAggregate.create(new LoginBadRequestException(authorizationValue.error.toString()))
    }
    const token = await authorizationService.auth(authorizationValue.getResult())

    if (!ExceptionAggregate.isExists(LOGIN_UNAUTHORIZED_COMPONENT) && token !== null) {
      authorizationService.setLocalToken(token.token)
      Authorization.create(false)

      return token.user
    }

    return null
  }

  /**
   * Отпра
   */
  public static logAuth (): void {
    authorizationService.signLogout()
  }

  /**
   * Отправить ссылку на восстановление пароля
   *
   * @param email емайл пользователя
   */
  public static async sendLinkForRecoveryPassword (email: string): Promise<RecoveryPasswordResponseValue> {
    ExceptionAggregate.clear(RECOVERY_PASSWORD_COMPONENT)
    const emailValue = RecoveryPasswordEmailValue.creat({
      email: email
    })

    if (emailValue.isFailure) {
      ExceptionAggregate.create(new RecoveryPasswordBadRequestException(emailValue.error.toString()))
    }

    return recoveryPasswordService.send(emailValue.getResult())
  }

  public static async sendNewPassword (value: MutationPasswordResetArgs): Promise<RecoveryPasswordResponseValue | void> {
    const passwordResetValue = PasswordResetValue.create(value)
    if (passwordResetValue.isFailure) {
      return
    }

    return recoveryPasswordService.sendPasswordReset(passwordResetValue.getResult())
  }
}
