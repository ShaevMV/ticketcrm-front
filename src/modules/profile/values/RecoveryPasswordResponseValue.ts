import Result from 'types-ddd/dist/core/result'
import ValueObject from 'types-ddd/dist/core/value-object'

export interface IRecoveryPasswordResponse {
  success: boolean,
  message: string
}

export class RecoveryPasswordResponseValue extends ValueObject<IRecoveryPasswordResponse> {
  public static create (prop: IRecoveryPasswordResponse): Result<RecoveryPasswordResponseValue> {
    return Result.ok<RecoveryPasswordResponseValue>(new RecoveryPasswordResponseValue(prop))
  }

  public get message (): string {
    return this.props.message
  }
}
