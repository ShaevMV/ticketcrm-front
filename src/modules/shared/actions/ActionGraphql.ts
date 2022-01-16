import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { DOMAIN_TYPES } from '@/domain/inject/types'

@injectable()
export class ActionGraphql {
  protected actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }
}
