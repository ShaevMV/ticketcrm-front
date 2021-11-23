import { PROFILE_TYPES } from './types'
import { domainContainer } from '@/domain/inject/domainInversify.config'
import { RegistrationActionGraphql } from '@/modules/profile/actions/RegistrationActionGraphql'
import { RegistrationService } from '@/modules/profile/services/RegistrationService'
import { VuexUserDataRepository } from '@/modules/profile/repositories/VuexUserDataRepository'

domainContainer.bind(PROFILE_TYPES.RegistrationActionGraphql).to(RegistrationActionGraphql)
domainContainer.bind(PROFILE_TYPES.RegistrationService).to(RegistrationService)
domainContainer.bind(PROFILE_TYPES.VuexUserDataRepository).to(VuexUserDataRepository)

export { domainContainer }
