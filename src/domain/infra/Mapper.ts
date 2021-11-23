import Result from 'types-ddd/dist/core/result'

export class Mapper<T> {
  private result: Result<T>

  constructor (result: Result<T>) {
    this.result = result;
  }

  public toDomain (): T | null {
    if (!this.result.isFailure) {
      return this.result.getResult()
    }

    return null
  }
}
