import { GetterTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { RootState } from '@/store'
export type Getters = {
  getToken(state: State): ITokenAuth | null
  isAuth(state: State): boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  getToken: (state) => state.token,
  isAuth: (state) => state.token !== null
}
