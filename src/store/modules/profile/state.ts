import { myContainer } from '@/domain/inject/inversify.config'
import { AuthorizationRepository } from '@/modules/auth/repositories/AuthorizationRepository'
import { TYPES } from '@/domain/inject/types'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'

const authorizationRepository = myContainer.get<AuthorizationRepository>(TYPES.AuthorizationRepository)

export type State = {
  token: ITokenAuth | null;
}

export const state = {
  token: authorizationRepository.getToken()
}
