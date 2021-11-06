import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionActionsTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'

@injectable()
export class VuexExceptionRepository {
  private storage: VuexStorage

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  public setError (error: IExceptionModule): void {
    this.storage.setValue<IExceptionModule>(
      [ExceptionModuleTypes.PROFILE_MODULE].toString(),
      [ExceptionActionsTypes.SET_ERROR].toString(),
      error
    )
  }
}
