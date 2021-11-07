import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

@injectable()
export class AuthorizationRefreshService {
  private authorizationAction: AuthorizationActionGraphql

  public constructor (
    @inject(AUTH_TYPES.AuthorizationActionGraphql) authorizationAction: AuthorizationActionGraphql
  ) {
    this.authorizationAction = authorizationAction
  }

  public async refreshToken (token: ITokenAuth): Promise<ITokenAuth> {
    return await this.authorizationAction.refresh(token).then(r => {
      return r
    })
  }

  public isNeedRefresh (token: ITokenAuth): boolean {
    return token.expiresIn <= Date.now()
  }
}
