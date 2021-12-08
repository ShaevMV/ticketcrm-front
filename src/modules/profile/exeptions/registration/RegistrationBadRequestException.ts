import { BadRequest } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export const REGISTRATION_COMPONENT = 'registration'
export const REGISTRATION_BAD_REQUEST_LOGIN_FIELD = 'email'
export const REGISTRATION_BAD_REQUEST_NAME_FIELD = 'name'
export const REGISTRATION_BAD_REQUEST_PASSWORD_CONFIRMATION_FIELD = 'password_confirmation'
export const REGISTRATION_BAD_REQUEST_PASSWORD_FIELD = 'password'

export class RegistrationBadRequestException extends BadRequest implements IExceptionModule {
  field = ''
  module: string = REGISTRATION_COMPONENT
}
