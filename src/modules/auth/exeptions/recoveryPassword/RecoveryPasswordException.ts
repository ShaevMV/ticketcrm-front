import { Conflict } from '@tsed/exceptions'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import {
  RECOVERY_PASSWORD_COMPONENT, RECOVERY_PASSWORD_FIELD_EMAIL
} from '@/modules/auth/exeptions/recoveryPassword/RecoveryPasswordBadRequestException'

export class RecoveryPasswordException extends Conflict implements IExceptionModule {
  module: string = RECOVERY_PASSWORD_COMPONENT
  field: string = RECOVERY_PASSWORD_FIELD_EMAIL
}
