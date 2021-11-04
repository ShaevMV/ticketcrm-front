import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'

const AUTH_TYPES = {
  AuthorizationActionGraphql: Symbol.for('AuthorizationActionGraphql'),
  AuthorizationService: Symbol.for('AuthorizationService'),
  AuthorizationLocalRepository: Symbol.for('AuthorizationLocalRepository'),
  VuexTokenRepository: Symbol.for('VuexTokenRepository'),
  Authorization: Symbol.for('Authorization')
}

export { AUTH_TYPES }
