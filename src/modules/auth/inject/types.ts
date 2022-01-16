import { AuthorizationService } from '@/modules/auth/service/login/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/login/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/token/VuexTokenRepository'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/login/AuthorizationActionGraphql'
import { AuthorizationRefreshService } from '@/modules/auth/service/login/AuthorizationRefreshService'
import { RefreshActionGraphql } from '@/modules/auth/actions/login/RefreshActionGraphql'
import { RecoveryPasswordService } from '@/modules/auth/service/recoveryPassword/RecoveryPasswordService'
import { RecoveryPasswordActionGraphql } from '@/modules/auth/actions/recoveryPassword/RecoveryPasswordActionGraphql'

const AUTH_TYPES = {
  AuthorizationActionGraphql: Symbol.for('AuthorizationActionGraphql'),
  AuthApplication: Symbol.for('AuthApplication'),
  RefreshActionGraphql: Symbol.for('RefreshActionGraphql'),
  RecoveryPasswordActionGraphql: Symbol.for('RecoveryPasswordActionGraphql'),

  AuthorizationService: Symbol.for('AuthorizationService'),
  AuthorizationRefreshService: Symbol.for('AuthorizationRefreshService'),
  RecoveryPasswordService: Symbol.for('RecoveryPasswordService'),

  AuthorizationLocalRepository: Symbol.for('AuthorizationLocalRepository'),
  VuexTokenRepository: Symbol.for('VuexTokenRepository'),

  Authorization: Symbol.for('Authorization')
}

export { AUTH_TYPES }
