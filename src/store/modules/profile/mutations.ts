import { MutationTree } from 'vuex'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

export type Mutations<S = State> = {
  setToken (state: S, payload: ITokenAuth | null): void
}

export const mutations: MutationTree<State> & Mutations = {
  setToken (state: State, payload: ITokenAuth | null): void {
    state.token = payload
  }
}
