import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { LocalStorage } from '@/domain/story/LocalStorage'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

const AUTHORIZATION_MODULE_USER = 'user'
const AUTHORIZATION_PARAMS_USER = 'token'

@injectable()
export class AuthorizationLocalRepository {
  private storage: LocalStorage

  public constructor (
    @inject(DOMAIN_TYPES.LocalStorage) storage: LocalStorage
  ) {
    this.storage = storage
  }

  setToken (tokenAuth: ITokenAuth): void {
    this.storage.setValue<ITokenAuth>(AUTHORIZATION_MODULE_USER, AUTHORIZATION_PARAMS_USER, tokenAuth)
  }

  getToken (): ITokenAuth | null {
    return this.storage.getValue<ITokenAuth>(AUTHORIZATION_MODULE_USER, AUTHORIZATION_PARAMS_USER)
  }

  clearToken (): void {
    this.storage.clearValue(AUTHORIZATION_MODULE_USER, AUTHORIZATION_PARAMS_USER)
  }
}
