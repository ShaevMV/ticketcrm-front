import { IStorage } from '@/domain/story/IStorage'
import { injectable } from 'inversify'

@injectable()
export class LocalStorage implements IStorage {
  _mapping (module: string, params: string): string {
    return module + '.' + params
  }

  getValue<T> (module: string, params: string): T | null {
    const value = localStorage.getItem(this._mapping(module, params))
    if (value === null) {
      return null
    }

    return JSON.parse(value)
  }

  setValue (module: string, params: string, value: any): void {
    localStorage.setItem(this._mapping(module, params), JSON.stringify(value))
  }
}
