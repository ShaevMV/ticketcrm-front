import Entity from "types-ddd/dist/core/entity";
import UniqueEntityID from "types-ddd/dist/core/unique-entity-id";
import Result from "types-ddd/dist/core/result";
import BaseDomainEntity from "types-ddd/dist/core/base-domain-entity";


export interface ITokenAuth extends BaseDomainEntity {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export class AuthTokenEntity extends Entity<ITokenAuth> {
  private constructor(props: ITokenAuth, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: ITokenAuth, id?: UniqueEntityID): Result<AuthTokenEntity> {
    return Result.ok<AuthTokenEntity>(new AuthTokenEntity(props, id));
  }
}
