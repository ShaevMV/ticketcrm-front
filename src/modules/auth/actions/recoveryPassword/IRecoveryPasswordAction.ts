import { RecoveryPasswordResponseValue } from '@/modules/auth/values/recoveryPassword/RecoveryPasswordResponseValue'
import { PasswordResetValue } from "@/modules/auth/values/recoveryPassword/PasswordResetValue";

export interface IRecoveryPasswordAction<T> {
  /**
   * Отправить ссылку на восстановление пароля
   * @param email
   */
  sendLinkForRecoveryPassword (email: string): Promise<RecoveryPasswordResponseValue>

  /**
   * Задать новый пароль
   * @param passwordResetValue
   */
  sendPasswordReset (passwordResetValue: PasswordResetValue): Promise<RecoveryPasswordResponseValue>
}
