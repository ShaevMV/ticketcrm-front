import { IExceptionModule } from '@/domain/exception/IExceptionModule'
import { domainContainer } from '@/modules/exception/inject/inversify.config'
import { ExceptionService } from '@/modules/exception/services/ExceptionService'
import { EXCEPTION_TYPES } from '@/modules/exception/inject/types'
import AggregateRoot from 'types-ddd/dist/core/aggregate-root'
import UniqueEntityID from 'types-ddd/dist/core/unique-entity-id'

const STATUS_SERVER_ERROR = 500
const MASSAGE_SERVER_ERROR = 'Ошибка на сервере, попробуйте позже'
const exceptionService = domainContainer.get<ExceptionService>(EXCEPTION_TYPES.ExceptionService)

/**
 * Агрегат для обработки исключений
 */
export class ExceptionAggregate extends AggregateRoot<IExceptionModule> {
  private constructor (props: IExceptionModule) {
    const id = props.module + '.' + props.field
    super(props, (new UniqueEntityID(id)))
  }

  public static create (exception: IExceptionModule): ExceptionAggregate {
    exceptionService.pushError(exception)
    return new ExceptionAggregate(exception)
  }

  /**
   * проверка на то что это пользовательское исключение
   */
  public isUserException (): boolean {
    return this.props.status < STATUS_SERVER_ERROR
  }

  get massage (): string {
    return this.props.message
  }

  get userMassage (): string {
    return this.isUserException() ? this.massage : MASSAGE_SERVER_ERROR
  }

  public static clear (component: string): void {
    exceptionService.clearErrorByComponent(component)
  }

  public static allClear (): void {
    exceptionService.clearError()
  }

  /**
   * Проверка наличе ошибки в компоненте
   * @param component
   */
  public static isExists (component: string): boolean {
    return exceptionService.isExistsByComponent(component)
  }
}
