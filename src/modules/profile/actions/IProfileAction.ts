import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

export interface IProfileAction {
  requestProfile (): Promise<IUserData | null>
}
