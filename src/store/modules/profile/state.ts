import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

export type State = {
  token: ITokenAuth | null;
  userData: IUserData | null;
}

export const state = {
  token: null,
  userData: null
}
