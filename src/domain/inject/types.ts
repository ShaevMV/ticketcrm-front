import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationRepository } from '@/modules/auth/repositories/AuthorizationRepository'

const TYPES = {
  ApiClient: Symbol.for('ApolloGraphql'),
  LocalStorage: Symbol.for('LocalStore'),
  AuthorizationAction: Symbol.for('AuthorizationAction'),
  AuthorizationService: Symbol.for('AuthorizationService'),
  AuthorizationRepository: Symbol.for('AuthorizationRepository'),
  Authorization: Symbol.for('Authorization')
}

export { TYPES }
