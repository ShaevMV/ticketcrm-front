import {
  Store as VuexStore,
  Module
} from 'vuex'

import { State, state } from '@/store/modules/profile/state'
import { getters, Getters } from '@/store/modules/profile/getters'
import { RootState } from '@/store'

export { State }

export type ProfileStore<S = State> = Omit<VuexStore<S>, 'getters' > & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  getters,
  // But without it, a bigger store might have clashes in namings
  namespaced: true
}
