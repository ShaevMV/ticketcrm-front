import Entity from 'types-ddd/dist/core/entity'
import UniqueEntityID from 'types-ddd/dist/core/unique-entity-id'
import Result from 'types-ddd/dist/core/result'
import BaseDomainEntity from 'types-ddd/dist/core/base-domain-entity'

export interface IUserData extends BaseDomainEntity {
  email: string,
  name: string,
  id: number
}

export class UserDataEntity extends Entity<IUserData> {
  private constructor (props: IUserData) {
    super(props, new UniqueEntityID(props.id))
  }

  public static create (props: IUserData): Result<UserDataEntity> {
    return Result.ok<UserDataEntity>(new UserDataEntity(props))
  }

  get id (): UniqueEntityID {
    return this._id
  }
}
