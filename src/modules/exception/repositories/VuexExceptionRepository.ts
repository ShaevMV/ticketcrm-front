import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

@injectable()
export class VuexExceptionRepository {
  private storage: VuexStorage

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  public setError (error: IExceptionModule): void {
    this.storage.setValue<IExceptionModule>('exception', 'setError', error)
  }
}
