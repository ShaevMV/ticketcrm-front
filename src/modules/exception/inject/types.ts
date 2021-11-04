import { VuexExceptionRepository } from '@/modules/exception/repositories/VuexExceptionRepository'
import { ExceptionService } from '@/modules/exception/services/ExceptionService'

const EXCEPTION_TYPES = {
  VuexExceptionRepository: Symbol.for('VuexExceptionRepository'),
  ExceptionService: Symbol.for('ExceptionService')
}

export { EXCEPTION_TYPES }
