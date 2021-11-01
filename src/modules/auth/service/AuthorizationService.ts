import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { TYPES } from '@/domain/inject/types'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'

@injectable()
export class AuthorizationService {
  private authorizationAction: AuthorizationActionGraphql
  private localTokenRepository: AuthorizationLocalRepository

  public constructor (
    @inject(TYPES.AuthorizationAction) authorizationAction: AuthorizationActionGraphql,
    @inject(TYPES.AuthorizationLocalRepository) localTokenRepository: AuthorizationLocalRepository
  ) {
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
      console.log(r)
      return r
    }).catch((expect) => {
      console.log(expect)
      throw expect
    })

    if (tokenAuth !== null) {
      this.localTokenRepository.setToken(tokenAuth)
    }
  }

  public getToken (): ITokenAuth | null {
    return this.localTokenRepository.getToken()
  }
}
