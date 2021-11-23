import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { BadRequest } from '@tsed/exceptions'

export class ValidateError extends BadRequest implements IExceptionModule {
  module = ''
  field = ''
}
