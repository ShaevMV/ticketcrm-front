import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { ProfileService } from '@/modules/profile/services/ProfileService'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'

@injectable()
export class ProfileApplication {
  private profileService: ProfileService;

  public constructor (
    @inject(PROFILE_TYPES.ProfileService) profileService: ProfileService
  ) {
    this.profileService = profileService
  }

  async sendProfile (): Promise<void> {
    const userData = await this.profileService.requestUserData().then((userData) => {
      return userData
    })
    if (userData !== null) {
      this.profileService.setUserData(userData)
    }
  }
}
