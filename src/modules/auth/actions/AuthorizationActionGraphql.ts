import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { AuthorizationActionInterface } from '@/modules/auth/actions/AuthorizationActionInterface'
import { LoginUnauthorizedException } from '@/modules/auth/exeptions/LoginUnauthorizedException'
import { TokenAuthMapper } from '@/modules/auth/mappers/TokenAuthMapper'

@injectable()
export class AuthorizationActionGraphql implements AuthorizationActionInterface<ITokenAuth | null> {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  async authSend (value: AuthorizationValue): Promise<ITokenAuth> {
    const MUTATION = `
      mutation Auth($email: String!, $password: String!){
          auth(email: $email, password: $password) {
            accessToken
            tokenType
            expiresIn
          }
      }
    `
    return new Promise<ITokenAuth>((resolve, reject) => {
      this.actionClient.client
        .mutation(MUTATION, {
          email: value.args.email,
          password: value.args.password
        }).toPromise()
        .then((r) => {
          if (r.error !== undefined) {
            reject(new LoginUnauthorizedException(r.error.message))
          } else {
            resolve(TokenAuthMapper.map(r.data.auth, value.args.isRememberMe ?? false))
          }
        })
    })
  }

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

    return new Promise<ITokenAuth>((resolve, reject) => {
      this.actionClient.client
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
