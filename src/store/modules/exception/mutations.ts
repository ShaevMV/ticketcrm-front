import { MutationTree } from 'vuex'
import { State } from '@/store/modules/exception/state'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionMutationsTypes } from '@/store/modules/exception/types'

export type Mutations<S = State> = {
  [ExceptionMutationsTypes.SET_ERROR] (state: S, payload: IExceptionModule): void
  [ExceptionMutationsTypes.CLEAR_ERROR] (state: S, payload: string): void
  [ExceptionMutationsTypes.CLEAR_ALL_ERROR] (state: S): void
}

export const mutations: MutationTree<State> & Mutations = {
  [ExceptionMutationsTypes.SET_ERROR] (state: State, payload: IExceptionModule): void {
    state.errors.push(payload)
  },
  [ExceptionMutationsTypes.CLEAR_ERROR] (state: State, payload: string): void {
    state.errors = state.errors.filter((v: IExceptionModule) => v.module !== payload)
  },
  [ExceptionMutationsTypes.CLEAR_ALL_ERROR] (state: State): void {
    state.errors = []
  }
}
