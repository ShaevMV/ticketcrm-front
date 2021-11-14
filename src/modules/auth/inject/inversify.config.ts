import { AUTH_TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { domainContainer } from '@/domain/inject/domainInversify.config'
import { AuthorizationRefreshService } from '@/modules/auth/service/AuthorizationRefreshService'
import { RefreshActionGraphql } from '@/modules/auth/actions/RefreshActionGraphql'

domainContainer.bind(AUTH_TYPES.AuthorizationActionGraphql).to(AuthorizationActionGraphql)
domainContainer.bind(AUTH_TYPES.RefreshActionGraphql).to(RefreshActionGraphql)
domainContainer.bind(AUTH_TYPES.AuthorizationService).to(AuthorizationService)
domainContainer.bind(AUTH_TYPES.AuthorizationRefreshService).to(AuthorizationRefreshService)
domainContainer.bind(AUTH_TYPES.AuthorizationLocalRepository).to(AuthorizationLocalRepository)
domainContainer.bind(AUTH_TYPES.VuexTokenRepository).to(VuexTokenRepository)

export { domainContainer }
