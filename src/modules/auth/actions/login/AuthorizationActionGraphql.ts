import { injectable } from 'inversify'
import 'reflect-metadata'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { IAuthorizationAction } from '@/modules/auth/actions/login/IAuthorizationAction'
import { LoginUnauthorizedException } from '@/modules/auth/exeptions/login/LoginUnauthorizedException'
import { TokenAuthMapper } from '@/modules/auth/mappers/TokenAuthMapper'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { ProfileDataMapper } from '@/modules/profile/mappers/ProfileDataMapper'
import { ActionGraphql } from '@/modules/shared/actions/ActionGraphql'

@injectable()
export class AuthorizationActionGraphql extends ActionGraphql implements IAuthorizationAction<{ user: IUserData; token: ITokenAuth } | null> {
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

  submitLogout (): Promise<null> {
    const MUTATION = `
      mutation Logout(){
          logout() {
          }
      }
    `
    console.log(123)

    this.actionClient.getClient().then(r => {
      r.mutation(MUTATION)
    })
    console.log(213)
    return new Promise<null>((resolve) => {
      resolve(null)
    })
  }
}
