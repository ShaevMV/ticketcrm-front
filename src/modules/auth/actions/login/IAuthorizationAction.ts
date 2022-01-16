import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'

export interface IAuthorizationAction<T> {
  authSend(value: AuthorizationValue): Promise<T>
  submitLogout(): Promise<null>
}
