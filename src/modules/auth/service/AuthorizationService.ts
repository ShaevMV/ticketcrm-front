import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import {AuthorizationValue} from "@/modules/auth/values/AuthorizationValue";
import {AuthorizationActionGraphql} from "../actions/AuthorizationActionGraphql";
import {TYPES} from "@/domain/inject/types";

@injectable()
export class AuthorizationService {
  private authorizationAction: AuthorizationActionGraphql

  public constructor (
    @inject(TYPES.AuthorizationAction) authorizationAction: AuthorizationActionGraphql
  ) {
    this.authorizationAction = authorizationAction
  }

  public auth (authorizationValue: AuthorizationValue) {
    this.authorizationAction.authSend(authorizationValue)
        .then((result)=>{
            console.log(result)
        })
  }
}
