import { GetterTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { RootState } from '@/store'
import { ProfileGettersTypes } from '@/store/modules/profile/types'

export type Getters = {
  [ProfileGettersTypes.GET_TOKEN](state: State): ITokenAuth | null
  [ProfileGettersTypes.IS_AUTH](state: State): boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  [ProfileGettersTypes.GET_TOKEN]: (state) => state.token,
  [ProfileGettersTypes.IS_AUTH]: (state) => state.token !== null
}
