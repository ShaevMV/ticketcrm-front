import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { DOMAIN_TYPES } from '@/domain/inject/types'
import { VuexStorage } from '@/domain/story/VuexStorage'
import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { ExceptionActionsTypes, ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'

@injectable()
export class VuexExceptionRepository {
  private storage: VuexStorage

  public constructor (
    @inject(DOMAIN_TYPES.VuexStorage) storage: VuexStorage
  ) {
    this.storage = storage
  }

  /**
   * Добавить ошибку в хранилище
   *
   * @param error Ошибка
   */
  public setError (error: IExceptionModule): void {
    this.storage.setValue<IExceptionModule>(
      [ExceptionModuleTypes.EXCEPTION_MODULE].toString(),
      [ExceptionActionsTypes.SET_ERROR].toString(),
      error
    )
  }

  /**
   * Очистить хранилище по компоненту
   *
   * @param moduleName название модуля
   */
  public clear (moduleName: string): void {
    this.storage.setValue<string>(
      [ExceptionModuleTypes.EXCEPTION_MODULE].toString(),
      [ExceptionActionsTypes.CLEAR_ERROR].toString(),
      moduleName
    )
  }

  /**
   * Найти все ошибки в компоненте
   *
   * @param moduleName название модуля
   */
  public findByModule (moduleName: string): Array<IExceptionModule> | null {
    const errors = this.storage.getValue<Array<IExceptionModule>>(
      [ExceptionModuleTypes.EXCEPTION_MODULE].toString(),
      [ExceptionGettersTypes.GET_ERRORS_BY_MODULE].toString()
    )

    return errors !== null ? errors.filter(error => error.module === moduleName) : null
  }

  /**
   * Очистить все ошибки во всех компонентах
   */
  public clearAll ():void {
    this.storage.setValue<undefined>(
      [ExceptionModuleTypes.EXCEPTION_MODULE].toString(),
      [ExceptionActionsTypes.CLEAR_ALL_ERROR].toString()
    )
  }
}
