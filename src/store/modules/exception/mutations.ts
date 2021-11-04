import { MutationTree } from 'vuex'
import { State } from '@/store/modules/exception/state'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export type Mutations<S = State> = {
  setError (state: S, payload: IExceptionModule): void
}

export const mutations: MutationTree<State> & Mutations = {
  setError (state: State, payload: IExceptionModule): void {
    state.errors.push(payload)
  }
}
