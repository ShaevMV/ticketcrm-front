import { CombinedError } from 'urql'
import { ValidateError } from '@/domain/exception/error/ValidateError'
import { ServerError } from '@/domain/exception/error/ServerError'

export class ExceptionResponseMapper {
  public static async map (error: CombinedError | any): Promise<Array<ValidateError | ServerError>> {
    if (error instanceof CombinedError) {
      const result: Array<ValidateError> = []
      await error.graphQLErrors.forEach(function (value, index) {
        if (value.extensions !== undefined && value.extensions.validation !== undefined && value.path !== undefined) {
          for (const key in value.extensions.validation) {
            const validateError = new ValidateError(value.extensions.validation[key][0])
            validateError.field = key
            validateError.module = value.path[index] !== undefined ? value.path[index].toString() : ''
            result.push(validateError)
          }
        }
      })
      return result
    }

    return [new ServerError('Что то пошло не так')]
  }
}
