import { BadRequest } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

const LOGIN_BAD_REQUEST_FIELD = 'login'
export const LOGIN_BAD_REQUEST_MODULE = 'auth'

export class LoginBadRequestException extends BadRequest implements IExceptionModule {
  module: string = LOGIN_BAD_REQUEST_MODULE
  field: string = LOGIN_BAD_REQUEST_FIELD
}
