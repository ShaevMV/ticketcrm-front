import Entity from 'types-ddd/dist/core/entity'
import Result from 'types-ddd/dist/core/result'
export class AuthTokenEntity extends Entity {
  constructor (props, id) {
    super(props, id)
  }

  static create (props, id) {
    return Result.ok(new AuthTokenEntity(props, id))
  }
}
// # sourceMappingURL=AuthTokenEntity.js.map
