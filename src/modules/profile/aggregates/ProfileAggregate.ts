import { injectable } from 'inversify'
import 'reflect-metadata'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import { UserDataEntity } from '@/modules/profile/entitys/UserDataEntity'
import { MutationRegistrationArgs } from '@/graphql/graphql'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { REGISTRATION_MODULE } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'
import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'
import { domainContainer } from '@/modules/profile/inject/inversify.config'
import { RegistrationService } from '@/modules/profile/services/RegistrationService'
import { PROFILE_TYPES } from '@/modules/profile/inject/types'
import { ITokenAuth } from '@/modules/auth/entitys/AuthTokenEntity'

const authorizationService = domainContainer.get<RegistrationService>(PROFILE_TYPES.RegistrationService)

@injectable()
export class Profile extends AggregateRoot<UserDataEntity> {
  private constructor (props: UserDataEntity) {
    super(props, props.id)
  }

  public static async registration (value: MutationRegistrationArgs): Promise<ITokenAuth | null> {
    ExceptionAggregate.clear(REGISTRATION_MODULE)
    const registrationDataValue = RegistrationDataValue.create(value)
    if (registrationDataValue.isFailure) {
      return null
    }

    return await authorizationService.registrationUser(registrationDataValue.getResult())
  }
}
