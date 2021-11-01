import { myContainer } from '@/domain/inject/inversify.config'
import { TYPES } from '@/domain/inject/types'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'
import { AuthorizationLocalRepository } from '@/modules/auth/repositories/AuthorizationLocalRepository'

const authorizationLocalRepository = myContainer.get<AuthorizationLocalRepository>(TYPES.AuthorizationLocalRepository)

export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: authorizationLocalRepository.getToken()
}
