import Result from "types-ddd/dist/core/result";
import ValueObject from "types-ddd/dist/core/value-object";
import {MutationAuthArgs} from "@/graphql/graphql";
import validator from "validator";


export class AuthorizationValue extends ValueObject<MutationAuthArgs> {
  private constructor(prop: MutationAuthArgs) {
    super(prop);
  }

  public static create(prop: MutationAuthArgs): Result<AuthorizationValue> {
    if(!validator.isEmail(prop.email)) {
      return Result.fail<AuthorizationValue>("Логин должен быть email");
    }

    return Result.ok<AuthorizationValue>(new AuthorizationValue(prop));
  }

  public get args(): MutationAuthArgs {
    return this.props;
  }
}
