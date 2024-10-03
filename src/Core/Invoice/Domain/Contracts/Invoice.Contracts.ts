import { Repository, Search } from '@ativoscapital/jedi.node.core'
import { InvoiceInterfaces } from '../Interfaces/Invoice.Interfaces'
import { Invoice } from '../Invoice.Entity'

export namespace InvoiceContracts {
  export interface Repository
    extends Repository.IContract<
      Invoice,
      InvoiceInterfaces.IProps,
      InvoiceInterfaces.IEntity,
      InvoiceInterfaces.ToJSON,
      Repository.IMethodDefaultOptions,
      InvoiceInterfaces.TypeOfId,
      InvoiceInterfaces.IEntityWithRelations,
      InvoiceInterfaces.DisabledTypesInNestedKeyCompletion
    > {}

  export class PaginatedSearchResult<
    Options extends Search.IDefaultResultOptions
  > extends Search.PaginatedSearchResult<
    Invoice,
    InvoiceInterfaces.ToJSON,
    InvoiceInterfaces.DisabledTypesInNestedKeyCompletion,
    Options
  > {}

  export interface IPaginatedSearchResultToJSON
    extends Search.IPaginatedSearchResultToJSON<InvoiceInterfaces.ToJSON> {}

  export class SearchParams extends Search.Params<
    InvoiceInterfaces.IEntity,
    InvoiceInterfaces.DisabledTypesInNestedKeyCompletion
  > {}

  export type ISearchParams = Search.IParams<
    InvoiceInterfaces.IEntity,
    InvoiceInterfaces.DisabledTypesInNestedKeyCompletion
  >

  export type ISearchParamsWithoutPagination = Search.IParamsWithoutPagination<
    InvoiceInterfaces.IEntity,
    InvoiceInterfaces.DisabledTypesInNestedKeyCompletion
  >
}
