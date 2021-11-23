import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { AuthorizationRefreshService } from '@/modules/auth/service/AuthorizationRefreshService'
import { RefreshActionGraphql } from '@/modules/auth/actions/RefreshActionGraphql'

const AUTH_TYPES = {
  AuthorizationActionGraphql: Symbol.for('AuthorizationActionGraphql'),
  RefreshActionGraphql: Symbol.for('RefreshActionGraphql'),
  AuthorizationService: Symbol.for('AuthorizationService'),
  AuthorizationRefreshService: Symbol.for('AuthorizationRefreshService'),
  AuthorizationLocalRepository: Symbol.for('AuthorizationLocalRepository'),
  VuexTokenRepository: Symbol.for('VuexTokenRepository'),
  Authorization: Symbol.for('Authorization')
}

export { AUTH_TYPES }
