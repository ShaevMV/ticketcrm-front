import { Container } from 'inversify'
import { TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationRepository } from '@/modules/auth/repositories/AuthorizationRepository'
import { LocalStorage } from '@/domain/story/LocalStorage'

const myContainer = new Container()

myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationActionGraphql)
myContainer.bind(TYPES.AuthorizationRepository).to(AuthorizationRepository)
myContainer.bind(TYPES.ApiClient).to(ApolloGraphql)
myContainer.bind(TYPES.LocalStorage).to(LocalStorage)

export { myContainer }
