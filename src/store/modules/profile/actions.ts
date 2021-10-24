import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { Mutations } from '@/store/modules/profile/mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  updateToken (
    { commit }: AugmentedActionContext,
    value: ITokenAuth): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  updateToken ({ commit }, value: ITokenAuth): void {
    console.log(value)
    commit('setToken', value)
  }
}
