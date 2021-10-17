import { AuthorizationAction } from '@/modules/auth/actions/AuthorizationAction'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'

const TYPES = {
  ApiClient: Symbol.for('ApolloGraphql'),
  AuthorizationAction: Symbol.for('AuthorizationAction'),
  AuthorizationService: Symbol.for('AuthorizationService')
}

export { TYPES }
