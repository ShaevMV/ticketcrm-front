import { MutationPasswordResetArgs } from '@/graphql/graphql'
import ValueObject from 'types-ddd/dist/core/value-object'
import Result from 'types-ddd/dist/core/result'
import validator from 'validator'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import {
  REGISTRATION_BAD_REQUEST_LOGIN_FIELD,
  REGISTRATION_BAD_REQUEST_PASSWORD_CONFIRMATION_FIELD,
  REGISTRATION_BAD_REQUEST_PASSWORD_FIELD
} from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'
import {
  RecoveryPasswordBadRequestException
} from '@/modules/auth/exeptions/recoveryPassword/RecoveryPasswordBadRequestException'

export class PasswordResetValue extends ValueObject<MutationPasswordResetArgs> {
  public static create (prop: MutationPasswordResetArgs): Result<PasswordResetValue> {
    if (!PasswordResetValue.validate(prop)) {
      return Result.fail<PasswordResetValue>('Ошибка в заполненных данных формы')
    }

    return Result.ok<PasswordResetValue>(new PasswordResetValue(prop))
  }

  public get args (): MutationPasswordResetArgs {
    return this.props
  }

  private static addException (message: string, field: string): RecoveryPasswordBadRequestException {
    const result = new RecoveryPasswordBadRequestException(message)
    result.field = field

    return result
  }

  /**
   /**
   * Валидация данных
   * @param prop данные из формы
   * @private
   */
  private static validate (prop: MutationPasswordResetArgs): boolean {
    let isOk = true
    if (validator.isEmpty(prop.email) || !validator.isEmail(prop.email)) {
      ExceptionAggregate.create(PasswordResetValue.addException('Логин должен быть email', REGISTRATION_BAD_REQUEST_LOGIN_FIELD))
      isOk = false
    }

    if (validator.isEmpty(prop.password)) {
      ExceptionAggregate.create(PasswordResetValue.addException('Пароль не может быть пустым', REGISTRATION_BAD_REQUEST_PASSWORD_FIELD))
      isOk = false
    }

    if (validator.isEmpty(prop.password_confirmation) || prop.password_confirmation !== prop.password) {
      ExceptionAggregate.create(PasswordResetValue.addException('Пароль не совпадает', REGISTRATION_BAD_REQUEST_PASSWORD_CONFIRMATION_FIELD))
      isOk = false
    }

    return isOk
  }
}
