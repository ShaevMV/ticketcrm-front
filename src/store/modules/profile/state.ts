import { Container } from 'inversify'
import { myContainer } from '@/domain/inject/inversify.config'
//  import { AuthorizationRepository } from '@/modules/auth/repositories/AuthorizationRepository'
import { TYPES } from '@/domain/inject/types'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
console.log(myContainer)
const myContainer2 = new Container()
console.log(myContainer2)
console.log(TYPES)

export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: null
}
