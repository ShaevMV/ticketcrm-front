import { RegistrationService } from '@/modules/profile/services/RegistrationService'
import { Profile } from '@/modules/profile/aggregates/ProfileAggregate'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'

const PROFILE_TYPES = {
  RegistrationService: Symbol.for('RegistrationService'),
  Profile: Symbol.for('Profile'),
  RegistrationActionGraphql: Symbol.for('RegistrationActionGraphql')
}

export { PROFILE_TYPES }
