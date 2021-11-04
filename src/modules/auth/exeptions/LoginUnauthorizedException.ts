import { Unauthorized } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

const LOGIN_UNAUTHORIZED_FIELD = 'auth'
const LOGIN_UNAUTHORIZED_MODULE = 'auth'

export class LoginUnauthorizedException extends Unauthorized implements IExceptionModule {
  field: string = LOGIN_UNAUTHORIZED_FIELD
  module: string = LOGIN_UNAUTHORIZED_MODULE;
}
