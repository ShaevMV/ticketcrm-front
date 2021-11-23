import { GetterTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { RootState } from '@/store'
import { ProfileGettersTypes } from '@/store/modules/profile/types'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

export type Getters = {
  [ProfileGettersTypes.GET_TOKEN](state: State): ITokenAuth | null
  [ProfileGettersTypes.GET_USER_DATA](state: State): IUserData | null
  [ProfileGettersTypes.IS_AUTH](state: State): boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  [ProfileGettersTypes.GET_TOKEN]: (state) => state.token,
  [ProfileGettersTypes.GET_USER_DATA]: (state) => state.userData,
  [ProfileGettersTypes.IS_AUTH]: (state) => state.token !== null
}
