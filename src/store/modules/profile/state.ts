import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'

const authorization = Authorization.create()
export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: authorization.isSuccess ? authorization.getResult().getToken() : null
}
