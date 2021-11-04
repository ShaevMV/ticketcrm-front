import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export type State = {
  errors: Array<IExceptionModule>;
}

export const state = {
  errors: []
}
