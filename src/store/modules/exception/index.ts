import {
  Store as VuexStore,
  DispatchOptions,
  CommitOptions,
  Module
} from 'vuex'

import { State, state } from '@/store/modules/exception/state'
import { getters, Getters } from '@/store/modules/exception/getters'
import { RootState } from '@/store'
import { mutations, Mutations } from '@/store/modules/exception/mutations'
import { actions, Actions } from '@/store/modules/exception/actions'

export { State }

export type ExceptionStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions> (
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
  // But without it, a bigger store might have clashes in namings
  namespaced: true
}
