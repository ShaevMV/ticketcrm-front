import Result from 'types-ddd/dist/core/result'
import ValueObject from 'types-ddd/dist/core/value-object'
import validator from 'validator'

export interface IRecoveryPasswordEmailValue {
  email: string
}

export class RecoveryPasswordEmailValue extends ValueObject<IRecoveryPasswordEmailValue> {
  public static creat (recoveryPasswordEmailValue: IRecoveryPasswordEmailValue): Result<RecoveryPasswordEmailValue> {
    if (!validator.isEmail(recoveryPasswordEmailValue.email)) {
      return Result.fail<RecoveryPasswordEmailValue>('Вы ввели не верный емайл')
    }

    return Result.ok<RecoveryPasswordEmailValue>(new RecoveryPasswordEmailValue(recoveryPasswordEmailValue))
  }

  public get email (): string {
    return this.props.email
  }
}
