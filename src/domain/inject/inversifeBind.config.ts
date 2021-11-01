import { Container } from 'inversify'
import { TYPES } from './types'
import { AuthorizationActionGraphql } from '@/modules/auth/actions/AuthorizationActionGraphql'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { LocalStorage } from '@/domain/story/LocalStorage'
import { AuthorizationService } from '@/modules/auth/service/AuthorizationService'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { VuexTokenRepository } from '@/modules/auth/repositories/VuexTokenRepository'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'
const myContainer = new Container()
myContainer.bind(TYPES.ApiClient).to(ApolloGraphql)
myContainer.bind(TYPES.LocalStorage).to(LocalStorage)
myContainer.bind(TYPES.VuexStorage).to(VuexStorage)
myContainer.bind(TYPES.AuthorizationAction).to(AuthorizationActionGraphql)
myContainer.bind(TYPES.AuthorizationService).to(AuthorizationService)
myContainer.bind(TYPES.AuthorizationLocalRepository).to(AuthorizationLocalRepository)
myContainer.bind(TYPES.VuexTokenRepository).to(VuexTokenRepository)
export { myContainer }
