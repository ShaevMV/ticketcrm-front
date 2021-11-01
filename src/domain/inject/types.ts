import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'

const TYPES = {
  ApiClient: Symbol.for('ApolloGraphql'),
  LocalStorage: Symbol.for('LocalStore'),
  VuexStorage: Symbol.for('VuexStorage'),
  AuthorizationAction: Symbol.for('AuthorizationAction'),
  AuthorizationService: Symbol.for('AuthorizationService'),
  AuthorizationLocalRepository: Symbol.for('AuthorizationLocalRepository'),
  Authorization: Symbol.for('Authorization')
}

export { TYPES }
