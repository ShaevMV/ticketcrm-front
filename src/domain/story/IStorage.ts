export interface IStorage {
  setValue<T> (module: string, params: string, value: T): void
  getValue<T> (module: string, params: string, props?: any): T | null
  clearValue (module: string, params: string): void
}
