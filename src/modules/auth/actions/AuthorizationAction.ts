import {inject, injectable} from 'inversify'
import "reflect-metadata";
import {TYPES} from "@/domen/inject/types";
import {ApolloGraphql} from "@/domen/apiClient/ApolloGraphql";
import {ITokenAuth} from "@/modules/auth/entity/AuthTokenEntity";
import {AuthorizationValue} from "@/modules/auth/values/AuthorizationValue";

@injectable()
export class AuthorizationAction {
  private _database: ApolloGraphql

  public constructor(
    @inject(TYPES.ApiClient)  database: ApolloGraphql
  ) {
    this._database = database;
  }

  getToken(value: AuthorizationValue): ITokenAuth {
    return {
      accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciO",
      tokenType: "bearer",
      expiresIn: 3600
    };
  }
}
