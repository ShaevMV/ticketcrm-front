import { IStorage } from '@/domain/story/IStorage'
import { injectable } from 'inversify'

@injectable()
export class LocalStorage implements IStorage {
  private static mapping (module: string, params: string): string {
    return module + '.' + params
  }

  getValue<T> (module: string, params: string, props?: any): T | null {
    const value = localStorage.getItem(LocalStorage.mapping(module, params))
    if (value === null) {
      return null
    }

    return JSON.parse(value)
  }

  setValue<T> (module: string, params: string, value: T): void {
    localStorage.setItem(LocalStorage.mapping(module, params), JSON.stringify(value))
  }

  clearValue (module: string, params: string): void {
    localStorage.removeItem(LocalStorage.mapping(module, params))
  }
}
