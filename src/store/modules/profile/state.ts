import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: null
}
