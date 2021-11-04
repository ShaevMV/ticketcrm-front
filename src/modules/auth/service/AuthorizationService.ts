import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { AUTH_TYPES } from '@/modules/auth/inject/types'

@injectable()
export class AuthorizationService {
  private authorizationAction: AuthorizationActionGraphql
  private vuexTokenRepository: VuexTokenRepository
  private localTokenRepository: AuthorizationLocalRepository

  public constructor (
    @inject(AUTH_TYPES.AuthorizationAction) authorizationAction: AuthorizationActionGraphql,
    @inject(AUTH_TYPES.AuthorizationLocalRepository) localTokenRepository: AuthorizationLocalRepository,
    @inject(AUTH_TYPES.VuexTokenRepository) vuexTokenRepository: VuexTokenRepository
  ) {
    this.vuexTokenRepository = vuexTokenRepository
    this.localTokenRepository = localTokenRepository
    this.authorizationAction = authorizationAction
  }

  /**
   * Авторизоваться
   *
   * @param authorizationValue
   */
  public async auth (authorizationValue: AuthorizationValue): Promise<void> {
    const tokenAuth = await this.authorizationAction.authSend(authorizationValue).then((r) => {
      return r
    }).catch((expect) => {
      console.log(expect)
      throw expect
    })

    if (tokenAuth !== null) {
      this.localTokenRepository.setToken(tokenAuth)
      this.vuexTokenRepository.setToken(tokenAuth)
    }
  }

  /**
   * Получить токен
   */
  public getToken (): ITokenAuth | null {
    return this.localTokenRepository.getToken()
  }

  /**
   * Записать токен в store
   *
   * @param token
   */
  public setVuexToken (token: ITokenAuth): void {
    this.vuexTokenRepository.setToken(token)
  }
}
