import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'

@injectable()
export class VuexTokenRepository {
  private storage: VuexStorage;

  public constructor (
    @inject(TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  setToken (tokenAuth: ITokenAuth): void {
    this.storage.setValue('profile', 'updateToken', tokenAuth)
  }
}
