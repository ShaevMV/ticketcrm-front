import { injectable } from 'inversify'
import 'reflect-metadata'
import { IRegistrationAction } from '@/modules/profile/actions/IRegistrationAction'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'
import { TokenAuthMapper } from '@/modules/auth/mappers/TokenAuthMapper'
import { ProfileDataMapper } from '@/modules/profile/mappers/ProfileDataMapper'
import { ExceptionResponseMapper } from '@/modules/exception/mappers/ExceptionResponseMapper'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { ActionGraphql } from '@/modules/shared/actions/ActionGraphql'

@injectable()
export class RegistrationActionGraphql extends ActionGraphql implements IRegistrationAction<null | { user: IUserData, token: ITokenAuth }> {
  registrationUser (value: RegistrationDataValue): Promise<{ user: IUserData; token: ITokenAuth } | null> {
    const MUTATION = `
      mutation Registration($email: String!, $password: String!, $password_confirmation: String!, $name: String!){
          registration(email: $email, password: $password, password_confirmation: $password_confirmation, name: $name) {
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
          password: value.args.password,
          password_confirmation: value.args.password_confirmation,
          name: value.args.name
        }).toPromise()
          .then((r) => {
            if (r.error !== undefined) {
              ExceptionResponseMapper.map(r.error).then(errors => {
                errors.forEach(function (value) {
                  ExceptionAggregate.create(value)
                })
              })
            } else {
              resolve({
                token: TokenAuthMapper.map(r.data.registration.token, false),
                user: ProfileDataMapper.map(r.data.registration.user)
              })
            }
          })
      })
    })
  }
}
