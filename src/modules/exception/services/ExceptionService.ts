import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { EXCEPTION_TYPES } from '@/modules/exception/inject/types'
import { VuexExceptionRepository } from '@/modules/exception/repositories/VuexExceptionRepository'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionMapper } from '@/modules/exception/mappers/ExceptionMapper'

@injectable()
export class ExceptionService {
  private vuexExceptionRepository: VuexExceptionRepository

  public constructor (
    @inject(EXCEPTION_TYPES.VuexExceptionRepository) vuexExceptionRepository: VuexExceptionRepository
  ) {
    this.vuexExceptionRepository = vuexExceptionRepository
  }

  public pushError (error: IExceptionModule): void {
    this.vuexExceptionRepository.setError(ExceptionMapper.map(error))
  }

  public clearErrorByModule (module: string): void {
    this.vuexExceptionRepository.clear(module)
  }
}
