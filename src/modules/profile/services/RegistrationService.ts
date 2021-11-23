import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'
import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { VuexUserDataRepository } from '@/modules/profile/repositories/VuexUserDataRepository'

@injectable()
export class RegistrationService {
  private registrationAction: RegistrationActionGraphql
  private vuexUserDataRepository: VuexUserDataRepository;

  public constructor (
    @inject(PROFILE_TYPES.RegistrationActionGraphql) registrationAction: RegistrationActionGraphql,
    @inject(PROFILE_TYPES.VuexUserDataRepository) vuexUserDataRepository: VuexUserDataRepository
  ) {
    this.vuexUserDataRepository = vuexUserDataRepository
    this.registrationAction = registrationAction
  }

  public async registrationUser (value: RegistrationDataValue): Promise<ITokenAuth | null> {
    const response = await this.registrationAction.registrationUser(value)
    if (response === null) {
      return null
    }
    this.vuexUserDataRepository.setUserData(response.user)

    return response.token
  }
}
