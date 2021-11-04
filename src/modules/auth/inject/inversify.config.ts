import { AUTH_TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { domainContainer } from '@/domain/inject/domainInversify.config'

domainContainer.bind(AUTH_TYPES.AuthorizationAction).to(AuthorizationActionGraphql)
domainContainer.bind(AUTH_TYPES.AuthorizationService).to(AuthorizationService)
domainContainer.bind(AUTH_TYPES.AuthorizationLocalRepository).to(AuthorizationLocalRepository)
domainContainer.bind(AUTH_TYPES.VuexTokenRepository).to(VuexTokenRepository)

console.log(domainContainer)
export { domainContainer }
