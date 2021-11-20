import { IStorage } from '@/domain/story/IStorage'
import { injectable } from 'inversify'
import { store } from '@/store'

@injectable()
export class VuexStorage implements IStorage {
  public static mapping (module: string, params: string): string {
    return module + '/' + params
  }

  /**
   * Получить данные из гетора
   * @param module
   * @param params
   */
  getValue<T> (module: string, params: string): T | null {
    return store.getters[VuexStorage.mapping(module, params)]
  }

  /**
   * Записать данные через актион
   * @param module
   * @param params
   * @param value
   */
  setValue<T> (module: string, params: string, value: T): void {
    store.dispatch(VuexStorage.mapping(module, params), value)
  }

  /**
   * Очистить данные
   * @param module
   * @param params
   */
  clearValue (module: string, params: string): void {
    store.dispatch(VuexStorage.mapping(module, params), null)
  }
}
