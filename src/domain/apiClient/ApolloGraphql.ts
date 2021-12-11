import { inject, injectable } from 'inversify'
import { createClient } from '@urql/core'
import { Client, dedupExchange, cacheExchange, fetchExchange } from 'urql'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthorizationRefreshService } from '@/modules/auth/service/login/AuthorizationRefreshService'

@injectable()
export class ApolloGraphql {
  private refreshService: AuthorizationRefreshService

  constructor (
    @inject(AUTH_TYPES.AuthorizationRefreshService) refreshService: AuthorizationRefreshService
  ) {
    this.refreshService = refreshService
  }

  public async getClient (): Promise<Client> {
    const token = await this.refreshService.getToken()
    return createClient({
      url: 'http://api.ticket.loc/graphql?XDEBUG_SESSION_START=PHPSTORM',
      fetchOptions: () => {
        return {
          headers: {
            'Content-Type': 'application/json',
            authorization: token ? token.tokenType + ' ' + token : ''
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
}
