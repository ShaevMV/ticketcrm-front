import { Container } from 'inversify'
import { DOMAIN_TYPES } from './types'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { LocalStorage } from '@/domain/story/LocalStorage'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { ApolloGraphqlForRefresh } from '@/domain/apiClient/ApolloGraphqlForRefresh'

const domainContainer = new Container()

domainContainer.bind(DOMAIN_TYPES.ApiClient).to(ApolloGraphql)
domainContainer.bind(DOMAIN_TYPES.ApiClientForRefresh).to(ApolloGraphqlForRefresh)
domainContainer.bind(DOMAIN_TYPES.LocalStorage).to(LocalStorage)
domainContainer.bind(DOMAIN_TYPES.VuexStorage).to(VuexStorage)

export { domainContainer }
