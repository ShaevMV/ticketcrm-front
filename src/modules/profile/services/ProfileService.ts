import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { VuexUserDataRepository } from '@/modules/profile/repositories/VuexUserDataRepository'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

@injectable()
export class ProfileService {
  private vuexUserDataRepository: VuexUserDataRepository;

  public constructor (
    @inject(PROFILE_TYPES.VuexUserDataRepository) vuexUserDataRepository: VuexUserDataRepository
  ) {
    this.vuexUserDataRepository = vuexUserDataRepository
  }

  public setUserData (data: IUserData): void {
    this.vuexUserDataRepository.setUserData(data)
  }
}
