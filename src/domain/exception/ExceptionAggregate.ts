import { Exception } from '@tsed/exceptions/lib/core/Exception'

const STATUS_SERVER_ERROR = 500
const MASSAGE_SERVER_ERROR = 'Ошибка на сервере, попробуйте позже'

/**
 * Агрегат для обработки исключений
 */
export class ExceptionAggregate {
  private exception: Exception

  private constructor (exception: Exception) {
    this.exception = exception
  }

  public static create (exception: Exception): ExceptionAggregate {
    return new ExceptionAggregate(exception)
  }

  /**
   * проверка на то что это пользовательское исключение
   */
  public isUserException (): boolean {
    return this.exception.status < STATUS_SERVER_ERROR
  }

  get massage (): string {
    return this.exception.message
  }

  get userMassage (): string {
    return this.isUserException() ? this.massage : MASSAGE_SERVER_ERROR
  }
}
