import { CombinedError } from 'urql'
import { ValidateError } from '@/domain/exception/error/ValidateError'
import { ServerError } from '@/domain/exception/error/ServerError'

export class ExceptionResponseMapper {
  public static async map (error: CombinedError | any): Promise<ValidateError | ServerError> {
    if (error instanceof CombinedError) {
      const result = new ValidateError('')
      await error.graphQLErrors.forEach(function (value, index) {
        if (value.extensions !== undefined && value.extensions.validation !== undefined && value.path !== undefined) {
          for (const key in value.extensions.validation) {
            console.log(value.path[index])
            console.log(key)
            console.log(value.extensions.validation[key][0])
            result.message = value.extensions.validation[key][0]
            result.field = key
            result.module = value.path[index] !== undefined ? value.path[index].toString() : ''
          }
        }
      })
      return result
    }

    return new ServerError('Что то пошло не так')
  }
}
