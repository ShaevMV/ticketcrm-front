import { Container } from 'inversify'
import { TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { LocalStorage } from '@/domain/story/LocalStorage'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
const myContainer = new Container()

myContainer.bind(TYPES.ApiClient).to(ApolloGraphql)
myContainer.bind(TYPES.LocalStorage).to(LocalStorage)
myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationActionGraphql)
myContainer.bind(TYPES.AuthorizationService).to(AuthorizationService)
myContainer.bind(TYPES.AuthorizationLocalRepository).to(AuthorizationLocalRepository)

export { myContainer }
