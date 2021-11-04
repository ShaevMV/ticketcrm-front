import { GetterTree } from 'vuex'
import { State } from '@/store/modules/exception/state'
import { RootState } from '@/store'

export type Getters = {
  getMassage (state: State): (module: string, field: string) => string | null,
  isExistsError (state: State): (module: string, field: string) => boolean,
}

export const getters: GetterTree<State, RootState> & Getters = {
  getMassage: (state: State) => (module: string, field: string): string | null => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined ? result.message : null
  },
  isExistsError: (state: State) => (module: string, field: string): boolean => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined
  }
}
