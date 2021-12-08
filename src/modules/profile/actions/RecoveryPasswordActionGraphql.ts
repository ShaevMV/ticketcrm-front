import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { IRecoveryPasswordAction } from '@/modules/profile/actions/IRecoveryPasswordAction'
import { ApolloGraphql } from '@/domain/apiClient/ApolloGraphql'
import { IRecoveryPasswordResponse } from '@/modules/profile/values/RecoveryPasswordResponseValue'

@injectable()
export class RecoveryPasswordActionGraphql implements IRecoveryPasswordAction<IRecoveryPasswordResponse> {
  private actionClient: ApolloGraphql

  public constructor (
    @inject(DOMAIN_TYPES.ApiClient) actionClient: ApolloGraphql
  ) {
    this.actionClient = actionClient
  }

  recoveryPassword (email: string): Promise<any> {
    return Promise.resolve(undefined);
  }
}
