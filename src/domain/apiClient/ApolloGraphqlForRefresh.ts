import { cacheExchange, Client, dedupExchange, fetchExchange } from 'urql'
import { createClient } from '@urql/core'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export class ApolloGraphqlForRefresh {
  private readonly _client: Client

  constructor (token: ITokenAuth) {
    this._client = createClient({
      url: 'http://api.ticket.loc/graphql',
      fetchOptions: () => {
        return {
          headers: {
            'Content-Type': 'application/json',
            authorization: token.tokenType + ' ' + token.accessToken
          }
        }
      },
      exchanges: [
        dedupExchange,
        cacheExchange,
        fetchExchange
      ]
    })
  }

  public get client (): Client {
    return this._client
  }
}
