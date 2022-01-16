import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { VuexUserDataRepository } from '@/modules/profile/repositories/VuexUserDataRepository'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { ProfileAction } from "@/modules/profile/actions/ProfileAction";

@injectable()
export class ProfileService {
  private vuexUserDataRepository: VuexUserDataRepository;
  private profileAction: ProfileAction;

  public constructor (
    @inject(PROFILE_TYPES.VuexUserDataRepository) vuexUserDataRepository: VuexUserDataRepository,
    @inject(PROFILE_TYPES.ProfileAction) profileAction: ProfileAction
  ) {
    this.profileAction = profileAction;
    this.vuexUserDataRepository = vuexUserDataRepository
  }

  public setUserData (data: IUserData): void {
    this.vuexUserDataRepository.setUserData(data)
  }

  public findUserData (): IUserData | null {
    return this.vuexUserDataRepository.findUserData()
  }

  public requestUserData (): Promise<IUserData | null> {
    return this.profileAction.requestProfile()
  }
}
