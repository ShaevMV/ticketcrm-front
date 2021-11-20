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
   * Очистить компонент от ошибок
   *
   * @param component
   */
  public clearErrorByComponent (component: string): void {
    this.vuexExceptionRepository.clear(component)
  }

  /**
   * Очистить все компоненты от ошибок
   */
  public clearError () : void {
    this.vuexExceptionRepository.clearAll()
  }

  /**
   * Проверка наличие в компоненте ошибки
   *
   * @param component
   */
  public isExistsByComponent (component: string): boolean {
    const findByModule = this.vuexExceptionRepository.findByModule(component)
    return findByModule !== null && isArray(findByModule) && findByModule.length > 0
  }
}
