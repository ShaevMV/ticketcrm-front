import Result from 'types-ddd/dist/core/result'
import ValueObject from 'types-ddd/dist/core/value-object'
import validator from 'validator'
export class AuthorizationValue extends ValueObject {
  constructor (prop) {
    super(prop)
  }

  static create (prop) {
    if (!validator.isEmail(prop.email)) {
      return Result.fail('Логин должен быть email')
    }
    return Result.ok(new AuthorizationValue(prop))
  }

  get args () {
    return this.props
  }
}
// # sourceMappingURL=AuthorizationValue.js.map
