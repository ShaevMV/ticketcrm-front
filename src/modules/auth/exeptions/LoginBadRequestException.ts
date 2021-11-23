import { BadRequest } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { LOGIN_UNAUTHORIZED_MODULE } from '@/modules/auth/exeptions/LoginUnauthorizedException'

export const LOGIN_BAD_REQUEST_FIELD = 'login'

export class LoginBadRequestException extends BadRequest implements IExceptionModule {
  module: string = LOGIN_UNAUTHORIZED_MODULE
  field: string = LOGIN_BAD_REQUEST_FIELD
}
