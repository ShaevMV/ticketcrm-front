import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { EXCEPTION_TYPES } from '@/modules/exception/inject/types'
import { VuexExceptionRepository } from '@/modules/exception/repositories/VuexExceptionRepository'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionMapper } from '@/modules/exception/mappers/ExceptionMapper'
import { isArray } from 'class-validator'

@injectable()
export class ExceptionService {
  private vuexExceptionRepository: VuexExceptionRepository

  public constructor (
    @inject(EXCEPTION_TYPES.VuexExceptionRepository) vuexExceptionRepository: VuexExceptionRepository
  ) {
    this.vuexExceptionRepository = vuexExceptionRepository
  }

  /**
   * Отправить ошибку
   *
   * @param error
   */
  public pushError (error: IExceptionModule): void {
    this.vuexExceptionRepository.setError(ExceptionMapper.map(error))
  }

  /**
   * Очистить модуль от ошибок
   *
   * @param module
   */
  public clearErrorByModule (module: string): void {
    this.vuexExceptionRepository.clear(module)
  }

  /**
   * Проверка наличие в компоненте ошибки
   *
   * @param component
   */
  public isExistsByModule (component: string): boolean {
    const findByModule = this.vuexExceptionRepository.findByModule(component)
    return findByModule !== null && isArray(findByModule) && findByModule.length > 0
  }
}
