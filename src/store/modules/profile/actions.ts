import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { State } from '@/store/modules/profile/state'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { Mutations } from '@/store/modules/profile/mutations'
import { ProfileActionsTypes, ProfileMutationsTypes } from '@/store/modules/profile/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [ProfileActionsTypes.UPDATE_TOKEN] (
    { commit }: AugmentedActionContext,
    value: ITokenAuth): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [ProfileActionsTypes.UPDATE_TOKEN] ({ commit }, value: ITokenAuth): void {
    commit(ProfileMutationsTypes.SET_TOKEN, value)
  }
}
