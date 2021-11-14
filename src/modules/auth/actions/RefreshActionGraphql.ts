import { injectable } from 'inversify'
import 'reflect-metadata'
import { IRefreshActionGraphql } from '@/modules/auth/actions/IRefreshActionGraphql'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { LoginUnauthorizedException } from '@/modules/auth/exeptions/LoginUnauthorizedException'
import { TokenAuthMapper } from '@/modules/auth/mappers/TokenAuthMapper'
import { ApolloGraphqlForRefresh } from '@/domain/apiClient/ApolloGraphqlForRefresh'

@injectable()
export class RefreshActionGraphql implements IRefreshActionGraphql<ITokenAuth> {
  async refresh (value: ITokenAuth): Promise<ITokenAuth> {
    const MUTATION = `
      mutation {
          tokenRefresh {
            accessToken
            tokenType
            expiresIn
          }
      }
    `
    const actionClient = new ApolloGraphqlForRefresh(value)
    return new Promise<ITokenAuth>((resolve, reject) => {
      actionClient.client
        .mutation(MUTATION).toPromise()
        .then((r) => {
          if (r.error !== undefined) {
            reject(new LoginUnauthorizedException(r.error.message))
          } else {
            resolve(TokenAuthMapper.map(r.data.tokenRefresh, value.isRemember))
          }
        })
    })
  }
}
