import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '@/domain/inject/types'
import { LocalStorage } from '@/domain/story/LocalStorage'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'

@injectable()
export class AuthorizationRepository {
  private storage: LocalStorage

  public constructor (
    @inject(TYPES.LocalStorage) storage: LocalStorage
  ) {
    this.storage = storage
  }

  setToken (tokenAuth: ITokenAuth): void {
    this.storage.setValue<ITokenAuth>('user', 'token', tokenAuth)
  }

  getToken (): ITokenAuth | null {
    return this.storage.getValue<ITokenAuth>('user', 'token')
  }
}
