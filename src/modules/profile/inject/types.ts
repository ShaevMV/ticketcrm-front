import { RegistrationService } from '@/modules/profile/services/RegistrationService'
import { Profile } from '@/modules/profile/aggregates/ProfileAggregate'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'
import { VuexUserDataRepository } from '@/modules/profile/repositories/VuexUserDataRepository'

const PROFILE_TYPES = {
  RegistrationService: Symbol.for('RegistrationService'),
  ProfileService: Symbol.for('ProfileService'),
  Profile: Symbol.for('Profile'),
  RegistrationActionGraphql: Symbol.for('RegistrationActionGraphql'),
  VuexUserDataRepository: Symbol.for('VuexUserDataRepository')
}

export { PROFILE_TYPES }
