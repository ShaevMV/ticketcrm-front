import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { ProfileActionsTypes, ProfileModuleTypes } from '@/store/modules/profile/types'

@injectable()
export class VuexTokenRepository {
  private storage: VuexStorage;

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  setToken (tokenAuth: ITokenAuth): void {
    this.storage.setValue<ITokenAuth>([ProfileModuleTypes.PROFILE_MODULE].toString(), [ProfileActionsTypes.UPDATE_TOKEN].toString(), tokenAuth)
  }
}
