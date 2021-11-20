import BaseDomainEntity from 'types-ddd/dist/core/base-domain-entity'

export interface IExceptionModule extends BaseDomainEntity {
  status: number,
  message: string,
  module: string,
  field: string,
}


export interface IExceptionModuleList extends BaseDomainEntity {
  listException: Array<IExceptionModule>
}
