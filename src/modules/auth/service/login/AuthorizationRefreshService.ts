import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { RefreshActionGraphql } from '@/modules/auth/actions/login/RefreshActionGraphql'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/login/AuthorizationLocalRepository'

@injectable()
export class AuthorizationRefreshService {
  private authorizationAction: RefreshActionGraphql
  private authorizationLocalRepository: AuthorizationLocalRepository;

  public constructor (
    @inject(AUTH_TYPES.RefreshActionGraphql) authorizationAction: RefreshActionGraphql,
    @inject(AUTH_TYPES.AuthorizationLocalRepository) authorizationLocalRepository: AuthorizationLocalRepository
  ) {
    this.authorizationLocalRepository = authorizationLocalRepository
    this.authorizationAction = authorizationAction
  }

  public async getToken (): Promise<ITokenAuth | null> {
    const tokenAuth = this.authorizationLocalRepository.getToken()
    if (tokenAuth !== null && AuthorizationRefreshService.isNeedRefresh(tokenAuth)) {
      return await this.refreshToken(tokenAuth)
    }
    return tokenAuth
  }

  private async refreshToken (token: ITokenAuth): Promise<ITokenAuth> {
    return await this.authorizationAction.refresh(token).then(r => {
      return r
    })
  }

  private static isNeedRefresh (token: ITokenAuth): boolean {
    return token.expiresIn <= Date.now()
  }
}
