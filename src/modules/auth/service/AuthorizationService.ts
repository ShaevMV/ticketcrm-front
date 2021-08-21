import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import {AuthorizationValue} from "@/modules/auth/values/AuthorizationValue";
import {AuthorizationAction} from "@/modules/auth/actions/AuthorizationAction";
import {TYPES} from "@/domain/inject/types";

@injectable()
export class AuthorizationService {
  private authorizationAction: AuthorizationAction

  public constructor (
    @inject(TYPES.AuthorizationAction) authorizationAction: AuthorizationAction
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
