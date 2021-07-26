import Result from "types-ddd/dist/core/result";
import ValueObject from "types-ddd/dist/core/value-object";
import validator from "validator";



export interface IAuthorizationForm {
  email: string;
  password: string;
}

export class AuthorizationValue extends ValueObject<IAuthorizationForm> {
  private constructor(prop: IAuthorizationForm) {
    super(prop);
  }

  public static create(prop: IAuthorizationForm): Result<AuthorizationValue> {
    if(!validator.isEmail(prop.email)) {
      return Result.fail<AuthorizationValue>("Логин должен быть email");
    }

    return Result.ok<AuthorizationValue>(new AuthorizationValue(prop));
  }

  public get form(): IAuthorizationForm {
    return this.props;
  }
}
