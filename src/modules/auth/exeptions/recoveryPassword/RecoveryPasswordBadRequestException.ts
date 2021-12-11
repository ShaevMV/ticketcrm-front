import { BadRequest } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

export const RECOVERY_PASSWORD_COMPONENT = 'recoveryPassword'
export const RECOVERY_PASSWORD_FIELD_EMAIL = 'email'

export class RecoveryPasswordBadRequestException extends BadRequest implements IExceptionModule {
  field: string = RECOVERY_PASSWORD_FIELD_EMAIL;
  module: string = RECOVERY_PASSWORD_COMPONENT;
}
