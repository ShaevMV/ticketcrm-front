import { injectable } from 'inversify'
import { createClient } from '@urql/core'
import { Client, dedupExchange, cacheExchange, fetchExchange } from 'urql'

@injectable()
export class ApolloGraphql {
  private readonly _client: Client

  constructor () {
    this._client = createClient({
      url: 'http://api.ticket.loc/graphql',
      fetchOptions: () => {
        return {
          headers: {
            'Content-Type': 'application/json'
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
