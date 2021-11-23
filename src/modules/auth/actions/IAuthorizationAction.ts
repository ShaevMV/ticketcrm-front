import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'

export interface IAuthorizationAction<T> {
  authSend(value: AuthorizationValue): Promise<T>
}
