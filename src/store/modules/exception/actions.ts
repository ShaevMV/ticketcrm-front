import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { State } from '@/store/modules/exception/state'
import { Mutations } from '@/store/modules/exception/mutations'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionActionsTypes, ExceptionMutationsTypes } from '@/store/modules/exception/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [ExceptionActionsTypes.SET_ERROR] (
    { commit }: AugmentedActionContext,
    value: IExceptionModule): void
  [ExceptionActionsTypes.CLEAR_ERROR] (
    { commit }: AugmentedActionContext,
    module: string): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [ExceptionActionsTypes.SET_ERROR] ({ commit }, value: IExceptionModule): void {
    commit(ExceptionMutationsTypes.SET_ERROR, value)
  },

  [ExceptionActionsTypes.CLEAR_ERROR] ({ commit }, module: string): void {
    commit(ExceptionMutationsTypes.CLEAR_ERROR, module)
  }
}
