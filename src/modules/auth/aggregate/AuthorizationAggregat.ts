import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { myContainer } from '@/domain/inject/inversify.config'
import { AuthorizationActionGraphql } from '../actions/AuthorizationActionGraphql'
import { TYPES } from '@/domain/inject/types'
import { AuthorizationRepository } from '@/modules/auth/repositories/AuthorizationRepository'

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity> {
  private constructor (props: AuthTokenEntity) {
    super(props, props.id)
  }

  public static create (): Result<Authorization> {
    const authorizationRepository = myContainer.get<AuthorizationRepository>(TYPES.AuthorizationRepository)
    const tokenAuth = authorizationRepository.getToken()
    if (tokenAuth === null) {
      return Result.fail<Authorization>('Пользователь не авторизован')
    }

    return Result.ok<Authorization>(new Authorization(AuthTokenEntity.create(tokenAuth).getResult()))
  }

  public static async auth (props: AuthorizationValue): Promise<ITokenAuth | null> {
    const action = myContainer.get<AuthorizationActionGraphql>(TYPES.AuthorizationAction)
    const tokenAuth = await action.authSend(props).then((r) => {
      return r
    })

    const authorizationRepository = myContainer.get<AuthorizationRepository>(TYPES.AuthorizationRepository)
    authorizationRepository.setToken(tokenAuth)

    return tokenAuth
  }
}
