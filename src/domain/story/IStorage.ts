export interface IStorage {
  setValue (module: string, params: string, value: any): void

  getValue<T> (module: string, params: string): T | null

}
