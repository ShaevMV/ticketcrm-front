import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'
import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'

@injectable()
export class RegistrationService {
  private registrationAction: RegistrationActionGraphql

  public constructor (
    @inject(PROFILE_TYPES.RegistrationActionGraphql) registrationAction: RegistrationActionGraphql
  ) {
    this.registrationAction = registrationAction
  }

  public async registrationUser (value: RegistrationDataValue): Promise<void> {
    await this.registrationAction.registrationUser(value)
  }
}
