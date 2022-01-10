import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { IAuthorizationAction } from '@/modules/auth/actions/login/IAuthorizationAction'
import { LoginUnauthorizedException } from '@/modules/auth/exeptions/login/LoginUnauthorizedException'
import { TokenAuthMapper } from '@/modules/auth/mappers/TokenAuthMapper'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { IUserData } from "@/modules/profile/entitys/UserDataEntity";
import { ProfileDataMapper } from "@/modules/profile/mappers/ProfileDataMapper";

@injectable()
export class AuthorizationActionGraphql implements IAuthorizationAction<{ user: IUserData; token: ITokenAuth } | null> {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  async authSend (value: AuthorizationValue): Promise<{ user: IUserData; token: ITokenAuth } | null> {
    const MUTATION = `
      mutation Auth($email: String!, $password: String!){
          auth(email: $email, password: $password) {
            token {
              accessToken
              tokenType
              expiresIn
            }
            user {
              email
              id
              name
            }
          }
      }
    `
    return new Promise<{ user: IUserData; token: ITokenAuth } | null>((resolve) => {
      this.actionClient.getClient().then(r => {
        r.mutation(MUTATION, {
          email: value.args.email,
          password: value.args.password
        }).toPromise()
          .then((r) => {
            if (r.error !== undefined) {
              ExceptionAggregate.create(new LoginUnauthorizedException(r.error.message))
            } else {
              resolve({
                token: TokenAuthMapper.map(r.data.auth.token, value.args.isRememberMe ?? false),
                user: ProfileDataMapper.map(r.data.auth.user)
              })
            }
          })
      })
    })
  }
}
