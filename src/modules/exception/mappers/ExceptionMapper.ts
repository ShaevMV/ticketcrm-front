import { IExceptionModule } from '@/domain/exception/IExceptionModule'

const GraphQL = '[GraphQL] '

export class ExceptionMapper {
  public static map (error: IExceptionModule): IExceptionModule {
    return {
      field: error.field,
      message: ExceptionMapper.clearMessage(error.message),
      module: error.module,
      status: error.status
    }
  }

  private static clearMessage (message: string): string {
    if (message.includes(GraphQL)) {
      return message.substring(GraphQL.length)
    }

    return message
  }
}
