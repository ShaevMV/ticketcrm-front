import { injectable } from 'inversify'
import { createClient } from '@urql/core'
import { Client, dedupExchange, cacheExchange, fetchExchange } from 'urql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

function getToken (): ITokenAuth | null {
  const token = localStorage.getItem('user.token')
  if (token === null) {
    return null
  }

  return JSON.parse(token).accessToken
}

@injectable()
export class ApolloGraphql {
  private readonly _client: Client

  constructor () {
    this._client = createClient({
      url: 'http://api.ticket.loc/graphql',
      fetchOptions: () => {
        const token = getToken()

        return {
          headers: {
            'Content-Type': 'application/json',
            authorization: token ? 'bearer ' + token : ''
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
