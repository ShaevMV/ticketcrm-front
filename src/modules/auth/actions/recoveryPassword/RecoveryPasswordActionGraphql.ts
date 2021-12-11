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

@injectable()
export class RecoveryPasswordActionGraphql implements IRecoveryPasswordAction<IRecoveryPasswordResponse> {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  recoveryPassword (email: string): Promise<RecoveryPasswordResponseValue> {
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
}
