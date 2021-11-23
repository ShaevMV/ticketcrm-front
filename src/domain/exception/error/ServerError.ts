import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { InternalServerError } from '@tsed/exceptions'

export const SERVER_MODULE = 'server'

export class ServerError extends InternalServerError implements IExceptionModule {
  module: string = SERVER_MODULE
  field = ''
}
