import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { IRecoveryPasswordAction } from '@/modules/auth/actions/recoveryPassword/IRecoveryPasswordAction'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import {
  IRecoveryPasswordResponse,
  RecoveryPasswordResponseValue
} from '@/modules/auth/values/recoveryPassword/RecoveryPasswordResponseValue'
import { RecoveryPasswordException } from '@/modules/auth/exeptions/recoveryPassword/RecoveryPasswordException'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { PasswordResetValue } from '@/modules/auth/values/recoveryPassword/PasswordResetValue'

@injectable()
export class RecoveryPasswordActionGraphql implements IRecoveryPasswordAction<IRecoveryPasswordResponse> {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  sendLinkForRecoveryPassword (email: string): Promise<RecoveryPasswordResponseValue> {
    const MUTATION = `
      mutation RecoveryPassword($email: String!){
          recoveryPassword(email: $email) {
            success
            userMessage
          }
      }
    `
    return new Promise<RecoveryPasswordResponseValue>((resolve) => {
      this.actionClient.getClient().then(r => {
        r.mutation(MUTATION, {
          email: email
        }).toPromise()
          .then((r) => {
            if (r.error !== undefined) {
              ExceptionAggregate.create(new RecoveryPasswordException(r.error.message))
            } else {
              resolve(RecoveryPasswordResponseValue.create({
                success: r.data.recoveryPassword.success,
                message: r.data.recoveryPassword.userMessage
              }).getResult())
            }
          })
      })
    })
  }

  sendPasswordReset (passwordResetValue: PasswordResetValue): Promise<RecoveryPasswordResponseValue> {
    const MUTATION = `
      mutation PasswordReset($email: String!, $token: String!, $password: String!, $password_confirmation: String!){
          passwordReset(email: $email, token: $token, password: $password, password_confirmation: $password_confirmation) {
            success
            userMessage
          }
      }
    `
    return new Promise<RecoveryPasswordResponseValue>((resolve) => {
      this.actionClient.getClient().then(r => {
        r.mutation(MUTATION, {
          email: passwordResetValue.args.email,
          token: passwordResetValue.args.token,
          password: passwordResetValue.args.password,
          password_confirmation: passwordResetValue.args.password_confirmation
        }).toPromise()
          .then((r) => {
            if (r.error !== undefined) {
              const error = new RecoveryPasswordException(r.error.message)
              error.field = 'message'
              ExceptionAggregate.create(error)
            } else {
              resolve(RecoveryPasswordResponseValue.create({
                success: r.data.passwordReset.success,
                message: r.data.passwordReset.userMessage
              }).getResult())
            }
          })
      })
    })
  }
}
