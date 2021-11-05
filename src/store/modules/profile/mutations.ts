import { MutationTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { ProfileMutationsTypes } from '@/store/modules/profile/types'

export type Mutations<S = State> = {
  [ProfileMutationsTypes.SET_TOKEN] (state: S, payload: ITokenAuth | null): void
}

export const mutations: MutationTree<State> & Mutations = {
  [ProfileMutationsTypes.SET_TOKEN] (state: State, payload: ITokenAuth | null): void {
    state.token = payload
  }
}
