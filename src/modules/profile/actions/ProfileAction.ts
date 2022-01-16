import { IProfileAction } from '@/modules/profile/actions/IProfileAction'

import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { ActionGraphql } from '@/modules/shared/actions/ActionGraphql'
import { ExceptionResponseMapper } from '@/modules/exception/mappers/ExceptionResponseMapper'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { ProfileDataMapper } from '@/modules/profile/mappers/ProfileDataMapper'

export class ProfileAction extends ActionGraphql implements IProfileAction {
  requestProfile (): Promise<IUserData | null> {
    const QUERY = `
      query Users(){
          users() {
            email
            id
            name
          }
      }
    `

    return new Promise<IUserData | null>((resolve) => {
      this.actionClient.getClient().then(r => {
        r.query(QUERY).toPromise().then((r) => {
          if (r.error !== undefined) {
            ExceptionResponseMapper.map(r.error).then(errors => {
              errors.forEach(function (value) {
                ExceptionAggregate.create(value)
              })
            })
          } else {
            resolve(ProfileDataMapper.map(r.data.registration.user))
          }
        })
      })
    })
  }
}
