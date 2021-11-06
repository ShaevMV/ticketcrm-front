import { GetterTree } from 'vuex'
import { State } from '@/store/modules/exception/state'
import { RootState } from '@/store'
import { ExceptionGettersTypes } from '@/store/modules/exception/types'

export type Getters = {
  [ExceptionGettersTypes.GET_MASSAGE] (state: State): (module: string, field: string) => string | null,
  [ExceptionGettersTypes.IS_EXISTS_ERROR] (state: State): (module: string, field: string) => boolean,
}

export const getters: GetterTree<State, RootState> & Getters = {
  [ExceptionGettersTypes.GET_MASSAGE]: (state: State) => (module: string, field: string): string | null => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined ? result.message : null
  },
  [ExceptionGettersTypes.IS_EXISTS_ERROR]: (state: State) => (module: string, field: string): boolean => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined
  }
}
