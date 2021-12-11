import { RecoveryPasswordResponseValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordResponseValue'

export interface IRecoveryPasswordAction<T> {
  recoveryPassword (email: string): Promise<RecoveryPasswordResponseValue>
}
