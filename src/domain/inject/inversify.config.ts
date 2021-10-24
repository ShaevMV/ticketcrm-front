import { Container } from 'inversify'
import { TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'

const myContainer = new Container()

myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationActionGraphql)
myContainer.bind(TYPES.ApiClient).to(ApolloGraphql)

export { myContainer }
