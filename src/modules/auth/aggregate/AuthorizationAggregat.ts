import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { myContainer } from '@/domain/inject/inversifeBind.config'
import { TYPES } from '@/domain/inject/types'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
const authorizationService = myContainer.get<AuthorizationService>(TYPES.AuthorizationService)

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

    return Result.ok<Authorization>(new Authorization(AuthTokenEntity.create(tokenAuth).getResult()))
  }

  /**
   * Авторизация пользователя
   *
   * @param authorizationValue
   */
  public static async auth (authorizationValue: Result<AuthorizationValue>): Promise<Result<Authorization>> {
    try {
      if (authorizationValue.isFailure === true) {
        throw authorizationValue.error.toString()
      }
      await authorizationService.auth(authorizationValue.getResult())

      return Authorization.create()
    } catch (e) {
      console.log(e)
      return Result.fail<Authorization>(e)
    }
  }

  /**
   * Вывести токен
   */
  public getToken (): ITokenAuth {
    return this.props.token
  }
}
