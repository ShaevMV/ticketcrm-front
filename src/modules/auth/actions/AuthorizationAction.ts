import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '@/domain/inject/types'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'

@injectable()
export class AuthorizationAction {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  async authSend (value: AuthorizationValue) {
    const MUTATION = `
      mutation {
          auth(email:"ward.maryse@example.org", password:"password") {
            accessToken
            tokenType
            expiresIn
          }
      }
    `

    return await this.actionClient.client
      .mutation(MUTATION)
      .toPromise()
  }
}
