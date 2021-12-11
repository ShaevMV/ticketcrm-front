import { Unauthorized } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export const LOGIN_UNAUTHORIZED_FIELD = 'auth'
export const LOGIN_UNAUTHORIZED_COMPONENT = 'auth'

export class LoginUnauthorizedException extends Unauthorized implements IExceptionModule {
  field: string = LOGIN_UNAUTHORIZED_FIELD
  module: string = LOGIN_UNAUTHORIZED_COMPONENT;
}
