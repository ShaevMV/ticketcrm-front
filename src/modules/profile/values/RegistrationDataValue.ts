import Result from 'types-ddd/dist/core/result'
import ValueObject from 'types-ddd/dist/core/value-object'
import { MutationRegistrationArgs } from '@/graphql/graphql'

import {
  REGISTRATION_BAD_REQUEST_LOGIN_FIELD,
  REGISTRATION_BAD_REQUEST_NAME_FIELD,
  REGISTRATION_BAD_REQUEST_PASSWORD_FIELD,
  RegistrationBadRequestException
} from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'

export class RegistrationDataValue extends ValueObject<MutationRegistrationArgs> {
  public static create (prop: MutationRegistrationArgs): Result<RegistrationDataValue> {
    if (prop.email === null) {
      throw RegistrationDataValue.addException('Логин должен быть email', REGISTRATION_BAD_REQUEST_LOGIN_FIELD)
    }

    if (prop.name === null || prop.name.length === 0) {
      throw RegistrationDataValue.addException('Имя не должно быть пустым', REGISTRATION_BAD_REQUEST_NAME_FIELD)
    }

    if (prop.password === null) {
      throw RegistrationDataValue.addException('Пароль не может быть пустым', REGISTRATION_BAD_REQUEST_PASSWORD_FIELD)
    }

    return Result.ok<RegistrationDataValue>(new RegistrationDataValue(prop))
  }

  private static addException (message: string, field: string): RegistrationBadRequestException {
    const exception = new RegistrationBadRequestException(message)
    exception.field = field
    return exception
  }

  public get args (): MutationRegistrationArgs {
    return this.props
  }
}
