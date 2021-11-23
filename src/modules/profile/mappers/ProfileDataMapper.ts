import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

export class ProfileDataMapper {
  public static map (userData: IUserData): IUserData {
    return {
      email: userData.email,
      id: userData.id,
      name: userData.name
    }
  }
}
