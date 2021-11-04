import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { State } from '@/store/modules/exception/state'
import { Mutations } from '@/store/modules/exception/mutations'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  setError (
    { commit }: AugmentedActionContext,
    value: IExceptionModule): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  setError ({ commit }, value: IExceptionModule): void {
    commit('setError', value)
  }
}
