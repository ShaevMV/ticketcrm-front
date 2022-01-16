import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { ProfileActionsTypes, ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'

@injectable()
export class VuexUserDataRepository {
  private storage: VuexStorage;

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  /**
   * Записать данные пользователя в store
   * @param userData
   */
  public setUserData (userData: IUserData): void {
    this.storage.setValue<IUserData>(
      [ProfileModuleTypes.PROFILE_MODULE].toString(),
      [ProfileActionsTypes.SET_USER_DATA].toString(),
      userData
    )
  }

  public findUserData (): IUserData | null {
    return this.storage.getValue<IUserData>(
      [ProfileModuleTypes.PROFILE_MODULE].toString(),
      [ProfileGettersTypes.GET_USER_DATA].toString()
    )
  }
}
