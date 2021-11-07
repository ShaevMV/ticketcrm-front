import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export interface AuthorizationActionInterface<T> {
  authSend(value: AuthorizationValue): Promise<T>
  refresh(token: ITokenAuth): Promise<T>
}
