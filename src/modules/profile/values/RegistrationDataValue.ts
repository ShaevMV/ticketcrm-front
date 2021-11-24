import Result from 'types-ddd/dist/core/result'
import ValueObject from 'types-ddd/dist/core/value-object'
import { MutationRegistrationArgs } from '@/graphql/graphql'
import validator from 'validator'

import {
  REGISTRATION_BAD_REQUEST_LOGIN_FIELD,
  REGISTRATION_BAD_REQUEST_NAME_FIELD, REGISTRATION_BAD_REQUEST_PASSWORD_CONFIRMATION_FIELD,
  REGISTRATION_BAD_REQUEST_PASSWORD_FIELD,
  RegistrationBadRequestException
} from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'

import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'

export class RegistrationDataValue extends ValueObject<MutationRegistrationArgs> {
  public static create (prop: MutationRegistrationArgs): Result<RegistrationDataValue> {
    if (RegistrationDataValue.validate(prop)) {
      return Result.ok<RegistrationDataValue>(new RegistrationDataValue(prop))
    } else {
      return Result.fail<RegistrationDataValue>('Ошибка в заполненных данных формы')
    }
  }

  /**
   * Создать и вывести исключение
   * @param message текст исключения
   * @param fieldInComponent поле в компоненте
   * @private
   */
  private static addException (message: string, fieldInComponent: string): RegistrationBadRequestException {
    const exception = new RegistrationBadRequestException(message)
    exception.field = fieldInComponent
    return exception
  }

  public get args (): MutationRegistrationArgs {
    return this.props
  }

  /**
   * Валидация данных
   * @param prop данные из формы
   * @private
   */
  private static validate (prop: MutationRegistrationArgs): boolean {
    let isOk = true
    if (validator.isEmpty(prop.email) || !validator.isEmail(prop.email)) {
      ExceptionAggregate.create(RegistrationDataValue.addException('Логин должен быть email', REGISTRATION_BAD_REQUEST_LOGIN_FIELD))
      isOk = false
    }

    if (validator.isEmpty(prop.name)) {
      ExceptionAggregate.create(RegistrationDataValue.addException('Имя не должно быть пустым', REGISTRATION_BAD_REQUEST_NAME_FIELD))
      isOk = false
    }

    if (validator.isEmpty(prop.password)) {
      ExceptionAggregate.create(RegistrationDataValue.addException('Пароль не может быть пустым', REGISTRATION_BAD_REQUEST_PASSWORD_FIELD))
      isOk = false
    }

    if (validator.isEmpty(prop.password_confirmation) || prop.password_confirmation !== prop.password) {
      ExceptionAggregate.create(RegistrationDataValue.addException('Пароль не совпадает', REGISTRATION_BAD_REQUEST_PASSWORD_CONFIRMATION_FIELD))
      isOk = false
    }

    return isOk
  }
}
