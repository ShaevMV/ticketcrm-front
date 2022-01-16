import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { IUserData, UserDataEntity } from '@/modules/profile/entitys/UserDataEntity'
import { MutationRegistrationArgs } from '@/graphql/graphql'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { REGISTRATION_COMPONENT } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'
import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'
import { domainContainer } from '@/modules/profile/inject/inversify.config'
import { RegistrationService } from '@/modules/profile/services/RegistrationService'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'
import { ProfileService } from '@/modules/profile/services/ProfileService'

const registrationService = domainContainer.get<RegistrationService>(PROFILE_TYPES.RegistrationService)
const profileService = domainContainer.get<ProfileService>(PROFILE_TYPES.ProfileService)

@injectable()
export class Profile extends AggregateRoot<UserDataEntity> {
  private constructor (props: UserDataEntity) {
    super(props, props.id)
  }

  /**
   * Регистрация
   * @param value данные для регистрации пользователя
   */
  public static async registration (value: MutationRegistrationArgs): Promise<ITokenAuth | null> {
    ExceptionAggregate.clear(REGISTRATION_COMPONENT)
    const registrationDataValue = RegistrationDataValue.create(value)
    if (registrationDataValue.isFailure) {
      return null
    }

    return await registrationService.registrationUser(registrationDataValue.getResult())
  }

  public static setProfile (data: IUserData): void {
    profileService.setUserData(data)
  }

  /*   public static async create (): Promise<void> {
     if (profileService.findUserData() === null) {
        let userData = profileService.requestUserData()
      }
  } */
}
