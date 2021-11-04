import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { domainContainer } from '@/modules/auth/inject/inversify.config'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { LoginBadRequestException } from '@/modules/auth/exeptions/LoginBadRequestException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { AUTH_TYPES } from '@/modules/auth/inject/types'

const authorizationService = domainContainer.get<AuthorizationService>(AUTH_TYPES.AuthorizationService)

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity> {
  private constructor (props: AuthTokenEntity) {
    super(props, props.id)
  }

  /**
   * Создать агрегат авторизация
   */
  public static create (): Result<Authorization> {
    const tokenAuth = authorizationService.getToken()
    if (tokenAuth === null) {
      return Result.fail<Authorization>('Пользователь не авторизован')
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
      if (authorizationValue.isFailure) {
        throw new LoginBadRequestException(authorizationValue.error.toString())
      }
      await authorizationService.auth(authorizationValue.getResult())

      return Authorization.create()
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
