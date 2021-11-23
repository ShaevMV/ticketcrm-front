import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { domainContainer } from '@/modules/auth/inject/inversify.config'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { LoginBadRequestException } from '@/modules/auth/exeptions/LoginBadRequestException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { LOGIN_UNAUTHORIZED_MODULE } from '@/modules/auth/exeptions/LoginUnauthorizedException'

const authorizationService = domainContainer.get<AuthorizationService>(AUTH_TYPES.AuthorizationService)

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity> {
  private constructor (props: AuthTokenEntity) {
    super(props, props.id)
  }

  /**
   * Создать агрегат авторизация
   * @param isLoadPage загрузка странице (для реализации isRememberMe)
   */
  public static create (isLoadPage = true): Result<Authorization> {
    const tokenAuth = authorizationService.findToken()

    if (tokenAuth === null ||
      authorizationService.isClearToken(isLoadPage, tokenAuth?.isRemember ?? false)) {
      authorizationService.clearToken()
      return Result.fail<Authorization>('Пользователь не авторизован')
    }

    if (!authorizationService.isAuth()) {
      authorizationService.setVuexToken(tokenAuth)
    }

    return Result.ok<Authorization>(new Authorization(AuthTokenEntity.create(tokenAuth).getResult()))
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
  public static async auth (authorizationValue: Result<AuthorizationValue>): Promise<Result<Authorization>> {
    ExceptionAggregate.clear(LOGIN_UNAUTHORIZED_MODULE)
    if (authorizationValue.isFailure) {
      ExceptionAggregate.create(new LoginBadRequestException(authorizationValue.error.toString()))
    }
    await authorizationService.auth(authorizationValue.getResult())
    console.log(321)

    if (ExceptionAggregate.isExists(LOGIN_UNAUTHORIZED_MODULE)) {
      console.log(321)
      return new Promise<Result<Authorization>>((resolve) => {
        resolve(Result.fail<Authorization>('Error'))
      })
    } else {
      return Authorization.create(false)
    }
  }
}
