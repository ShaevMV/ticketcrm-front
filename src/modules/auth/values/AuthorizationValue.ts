import Result from "types-ddd/dist/core/result";
import ValueObject from "types-ddd/dist/core/value-object";


export interface IAuthorizationForm {
  email: string;
  password: string;
}

export class AuthorizationValue extends ValueObject<IAuthorizationForm> {
  private constructor(prop: IAuthorizationForm) {
    super(prop);
  }

  public static create(prop: IAuthorizationForm): Result<AuthorizationValue> {

    return Result.ok<AuthorizationValue>(new AuthorizationValue(prop));
  }

  public get form(): IAuthorizationForm {
    return this.props;
  }
}
