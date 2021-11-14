import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { VuexStorage } from '@/domain/story/VuexStorage'

const DOMAIN_TYPES = {
  ApiClient: Symbol.for('ApolloGraphql'),
  ApiClientForRefresh: Symbol.for('ApolloGraphqlForRefresh'),
  LocalStorage: Symbol.for('LocalStore'),
  VuexStorage: Symbol.for('VuexStorage')
}

export { DOMAIN_TYPES }
