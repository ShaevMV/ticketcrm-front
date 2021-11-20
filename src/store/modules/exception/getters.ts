import { GetterTree } from 'vuex'
import { State } from '@/store/modules/exception/state'
import { RootState } from '@/store'
import { ExceptionGettersTypes } from '@/store/modules/exception/types'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export type Getters = {
  [ExceptionGettersTypes.GET_MASSAGE] (state: State): (module: string, field: string) => string | null,
  [ExceptionGettersTypes.IS_EXISTS_ERROR] (state: State): (module: string, field: string) => boolean,
  [ExceptionGettersTypes.GET_ERRORS_BY_MODULE] (state: State): Array<IExceptionModule>,
}

export const getters: GetterTree<State, RootState> & Getters = {
  [ExceptionGettersTypes.GET_MASSAGE]: (state: State) => (module: string, field: string): string | null => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined ? result.message : null
  },
  [ExceptionGettersTypes.IS_EXISTS_ERROR]: (state: State) => (module: string, field: string): boolean => {
    const result = state.errors.find(error => error.module === module && error.field === field)

    return result !== undefined
  },
  [ExceptionGettersTypes.GET_ERRORS_BY_MODULE]: (state: State): Array<IExceptionModule> => {
    return state.errors
  }
}
