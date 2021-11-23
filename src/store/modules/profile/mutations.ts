import { MutationTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { ProfileMutationsTypes } from '@/store/modules/profile/types'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

export type Mutations<S = State> = {
  [ProfileMutationsTypes.SET_TOKEN] (state: S, payload: ITokenAuth | null): void
  [ProfileMutationsTypes.SET_USER_DATA] (state: S, payload: IUserData | null): void
}

export const mutations: MutationTree<State> & Mutations = {
  [ProfileMutationsTypes.SET_TOKEN] (state: State, payload: ITokenAuth | null): void {
    state.token = payload
  },
  [ProfileMutationsTypes.SET_USER_DATA] (state: State, payload: IUserData | null): void {
    state.userData = payload
  }
}
