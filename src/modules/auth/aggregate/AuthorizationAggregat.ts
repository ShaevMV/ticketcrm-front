import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { domainContainer } from '@/modules/auth/inject/inversify.config'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { LOGIN_BAD_REQUEST_MODULE, LoginBadRequestException } from '@/modules/auth/exeptions/LoginBadRequestException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthorizationRefreshService } from '@/modules/auth/service/AuthorizationRefreshService'

const authorizationService = domainContainer.get<AuthorizationService>(AUTH_TYPES.AuthorizationService)
const authorizationRefreshService = domainContainer.get<AuthorizationRefreshService>(AUTH_TYPES.AuthorizationRefreshService)

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity> {
  private constructor (props: AuthTokenEntity) {
    super(props, props.id)
  }

  /**
   * Создать агрегат авторизация
   */
  public static async create (isLoadPage = true): Promise<Result<Authorization>> {
    let tokenAuth = authorizationService.getToken(isLoadPage)
    if (tokenAuth === null) {
      return Result.fail<Authorization>('Пользователь не авторизован')
    }

    if (authorizationRefreshService.isNeedRefresh(tokenAuth)) {
      console.log(tokenAuth)
      tokenAuth = await authorizationRefreshService.refreshToken(tokenAuth)
      authorizationService.setLocalToken(tokenAuth)
      console.log(tokenAuth)
    }
    authorizationService.setVuexToken(tokenAuth)

    return Result.ok<Authorization>(new Authorization(AuthTokenEntity.create(tokenAuth).getResult()))
  }

  /**
   * Авторизация пользователя
   *
   * @param authorizationValue
   */
  public static async auth (authorizationValue: Result<AuthorizationValue>): Promise<Result<Authorization>> {
    try {
      ExceptionAggregate.clear(LOGIN_BAD_REQUEST_MODULE)

      if (authorizationValue.isFailure) {
        throw new LoginBadRequestException(authorizationValue.error.toString())
      }
      await authorizationService.auth(authorizationValue.getResult())

      return Authorization.create(false)
    } catch (e) {
      const exception = ExceptionAggregate.create(e)

      return Result.fail<Authorization>(exception.userMassage)
    }
  }

  /**
   * Вывести токен
   */
  public getToken (): ITokenAuth {
    return this.props.token
  }
}
