import { domainContainer } from '@/domain/inject/domainInversify.config'
import { EXCEPTION_TYPES } from './types'
import { VuexExceptionRepository } from '@/modules/exception/repositories/VuexExceptionRepository'
import { ExceptionService } from '@/modules/exception/services/ExceptionService'

domainContainer.bind(EXCEPTION_TYPES.VuexExceptionRepository).to(VuexExceptionRepository)
domainContainer.bind(EXCEPTION_TYPES.ExceptionService).to(ExceptionService)

export { domainContainer }
