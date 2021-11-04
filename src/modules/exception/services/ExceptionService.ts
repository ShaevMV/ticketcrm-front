import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { EXCEPTION_TYPES } from '@/modules/exception/inject/types'
import { VuexExceptionRepository } from '@/modules/exception/repositories/VuexExceptionRepository'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'

@injectable()
export class ExceptionService {
  private vuexExceptionRepository: VuexExceptionRepository

  public constructor (
    @inject(EXCEPTION_TYPES.VuexExceptionRepository) vuexExceptionRepository: VuexExceptionRepository
  ) {
    this.vuexExceptionRepository = vuexExceptionRepository
  }

  public pushError (error: IExceptionModule): void {
    const userError: IExceptionModule = {
      field: error.field,
      message: error.message,
      module: error.module,
      status: error.status
    }

    this.vuexExceptionRepository.setError(userError)
  }
}
