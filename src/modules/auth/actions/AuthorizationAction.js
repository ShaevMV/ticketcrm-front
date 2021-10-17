import { __decorate, __metadata, __param } from 'tslib'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '@/domain/inject/types'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
let AuthorizationAction = class AuthorizationAction {
  constructor (actionClient) {
    this.actionClient = actionClient
  }

  async auth (value) {
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
AuthorizationAction = __decorate([
  injectable(),
  __param(0, inject(TYPES.ApiClient)),
  __metadata('design:paramtypes', [ApolloGraphql])
], AuthorizationAction)
export { AuthorizationAction }
// # sourceMappingURL=AuthorizationAction.js.map
