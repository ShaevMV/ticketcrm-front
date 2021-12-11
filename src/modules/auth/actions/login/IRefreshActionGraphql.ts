import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export interface IRefreshActionGraphql<T> {
  refresh (token: ITokenAuth): Promise<T>
}
