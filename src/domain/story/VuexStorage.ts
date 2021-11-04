import { IStorage } from '@/domain/story/IStorage'
import { injectable } from 'inversify'
import { store } from '@/store'

@injectable()
export class VuexStorage implements IStorage {
  private static mapping (module: string, params: string): string {
    return module + '/' + params
  }

  getValue<T> (module: string, params: string): T | null {
    return null
  }

  setValue<T> (module: string, params: string, value: T): void {
    store.dispatch(VuexStorage.mapping(module, params), value).then(r => {
      console.log(r)
    })
  }
}
