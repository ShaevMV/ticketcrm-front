import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { RecoveryPasswordActionGraphql } from '@/modules/auth/actions/recoveryPassword/RecoveryPasswordActionGraphql'
import { RecoveryPasswordEmailValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordEmailValue'
import { RecoveryPasswordResponseValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordResponseValue'
import { PasswordResetValue } from '@/modules/auth/values/recoveryPassword/PasswordResetValue'

@injectable()
export class RecoveryPasswordService {
  private recoveryPasswordAction: RecoveryPasswordActionGraphql;

  public constructor (
    @inject(AUTH_TYPES.RecoveryPasswordActionGraphql) recoveryPasswordAction: RecoveryPasswordActionGraphql
  ) {
    this.recoveryPasswordAction = recoveryPasswordAction
  }

  public async send (recoveryPasswordEmailValue: RecoveryPasswordEmailValue): Promise<RecoveryPasswordResponseValue> {
    return this.recoveryPasswordAction.sendLinkForRecoveryPassword(recoveryPasswordEmailValue.email)
  }

  public async sendPasswordReset (passwordResetValue: PasswordResetValue): Promise<RecoveryPasswordResponseValue> {
    return this.recoveryPasswordAction.sendPasswordReset(passwordResetValue)
  }
}
