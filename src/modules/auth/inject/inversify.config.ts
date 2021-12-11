import { AUTH_TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/login/AuthorizationActionGraphql'
import { AuthorizationService } from '@/modules/auth/service/login/AuthorizationService'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/login/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/token/VuexTokenRepository'
import { domainContainer } from '@/domain/inject/domainInversify.config'
import { AuthorizationRefreshService } from '@/modules/auth/service/login/AuthorizationRefreshService'
import { RefreshActionGraphql } from '@/modules/auth/actions/login/RefreshActionGraphql'
import { RecoveryPasswordService } from '@/modules/auth/service/recoveryPassword/RecoveryPasswordService'
import { RecoveryPasswordActionGraphql } from '@/modules/auth/actions/recoveryPassword/RecoveryPasswordActionGraphql'

domainContainer.bind(AUTH_TYPES.AuthorizationActionGraphql).to(AuthorizationActionGraphql)
domainContainer.bind(AUTH_TYPES.RefreshActionGraphql).to(RefreshActionGraphql)
domainContainer.bind(AUTH_TYPES.RecoveryPasswordActionGraphql).to(RecoveryPasswordActionGraphql)

domainContainer.bind(AUTH_TYPES.AuthorizationService).to(AuthorizationService)
domainContainer.bind(AUTH_TYPES.AuthorizationRefreshService).to(AuthorizationRefreshService)
domainContainer.bind(AUTH_TYPES.RecoveryPasswordService).to(RecoveryPasswordService)


domainContainer.bind(AUTH_TYPES.AuthorizationLocalRepository).to(AuthorizationLocalRepository)
domainContainer.bind(AUTH_TYPES.VuexTokenRepository).to(VuexTokenRepository)

export { domainContainer }
