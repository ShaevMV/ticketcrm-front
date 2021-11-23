import { RegistrationDataValue } from '@/modules/profile/values/RegistrationDataValue'

export interface IRegistrationAction<T> {
  registrationUser (value: RegistrationDataValue): Promise<T>
}
