import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'

export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: null
}
