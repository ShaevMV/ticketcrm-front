import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'

@injectable()
export class VuexExceptionRepository {
  private storage: VuexStorage

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  public setError (module: string, field: string, massage: string): void {
    this.storage.setValue<string>(module, field, massage)
  }
}
