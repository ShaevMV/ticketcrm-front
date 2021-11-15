import { PROFILE_TYPES } from './types'
import { domainContainer } from '@/domain/inject/domainInversify.config'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'
import { RegistrationService } from '@/modules/profile/services/RegistrationService'

domainContainer.bind(PROFILE_TYPES.RegistrationActionGraphql).to(RegistrationActionGraphql)
domainContainer.bind(PROFILE_TYPES.RegistrationService).to(RegistrationService)

export { domainContainer }
