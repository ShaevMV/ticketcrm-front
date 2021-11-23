import { __decorate, __metadata } from 'tslib'
import { injectable } from 'inversify'
import { createClient } from '@urql/core'
let ApolloGraphql = class ApolloGraphql {
  constructor () {
    this._client = createClient({
      url: process.env.URL_GRAPHQL
    })
  }

  get client () {
    return this._client
  }
}
ApolloGraphql = __decorate([
  injectable(),
  __metadata('design:paramtypes', [])
], ApolloGraphql)
export { ApolloGraphql }
// # sourceMappingURL=ApolloGraphql.js.map
