import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'

const TYPES = {
  ApiClient: Symbol.for('ApolloGraphql'),
  AuthorizationAction: Symbol.for('AuthorizationActionGraphql'),
  AuthorizationService: Symbol.for('AuthorizationService'),
  Authorization: Symbol.for('Authorization')
}

export { TYPES }
