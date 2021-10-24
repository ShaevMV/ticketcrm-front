import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'

export interface AuthorizationActionInterface<T> {
  authSend(value: AuthorizationValue): Promise<T>
}
