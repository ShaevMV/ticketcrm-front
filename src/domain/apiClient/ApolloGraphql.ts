import { injectable } from 'inversify'
import { createClient } from '@urql/core'
import { Client, dedupExchange, cacheExchange, fetchExchange } from 'urql'
import fetch from 'cross-fetch'

@injectable()
export class ApolloGraphql {
  private readonly _client: Client

  constructor () {
    this._client = createClient({
      url: 'http://172.17.0.1/graphql',
      fetch: fetch,
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
