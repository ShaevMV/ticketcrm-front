import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { AuthTokenEntity } from '@/modules/auth/entity/AuthTokenEntity'
import Result from 'types-ddd/dist/core/result'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { myContainer } from '@/domain/inject/inversify.config'
import { AuthorizationActionGraphql } from '../actions/AuthorizationActionGraphql'
import { TYPES } from '@/domain/inject/types'

@injectable()
export class Authorization extends AggregateRoot<AuthTokenEntity> {
  private constructor (props: AuthTokenEntity) {
    super(props, props.id)
  }

  public static create (props: AuthTokenEntity): Result<Authorization> {
    return Result.ok<Authorization>(new Authorization(props))
  }

  public static async auth (props: AuthorizationValue): Promise<Result<Authorization>> {
    const action = myContainer.get<AuthorizationActionGraphql>(TYPES.AuthorizationAction)

    const tokenAuth = await action.authSend(props).then((r) => {
      return AuthTokenEntity.create(r).getResult()
    })

    return Result.ok<Authorization>(new Authorization(tokenAuth))
  }
}
