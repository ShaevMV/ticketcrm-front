import { Container } from 'inversify'
import { TYPES } from './types'
import { AuthorizationAction } from '@/modules/auth/actions/AuthorizationAction'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'

const myContainer = new Container()

myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationAction)
myContainer.bind(TYPES.ApiClient).to(ApolloGraphql)

export { myContainer }
