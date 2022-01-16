import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/login/AuthorizationActionGraphql'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/login/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/token/VuexTokenRepository'
import { AuthTokenEntity, ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

@injectable()
export class AuthApplication {
  private authorizationAction: AuthorizationActionGraphql
  private localTokenRepository: AuthorizationLocalRepository
  private vuexTokenRepository: VuexTokenRepository

  public constructor (
    @inject(AUTH_TYPES.AuthorizationActionGraphql) authorizationAction: AuthorizationActionGraphql,
    @inject(AUTH_TYPES.AuthorizationLocalRepository) localTokenRepository: AuthorizationLocalRepository,
    @inject(AUTH_TYPES.VuexTokenRepository) vuexTokenRepository: VuexTokenRepository
  ) {
    this.authorizationAction = authorizationAction
    this.localTokenRepository = localTokenRepository
    this.vuexTokenRepository = vuexTokenRepository
  }

  login (value: AuthorizationValue): Promise<Authorization | null> {
    return new Promise<Authorization | null>(resolve => {
      this.authorizationAction.authSend(value).then((r) => {
        if (r !== null) {
          this.setTokenInMemory(r.token)
          resolve(new Authorization(AuthTokenEntity.create(r.token).getResult()))
        }
      })
    })
  }

  private setTokenInMemory (token: ITokenAuth): void {
    this.localTokenRepository.setToken(token)
    this.vuexTokenRepository.setToken(token)
  }
}
