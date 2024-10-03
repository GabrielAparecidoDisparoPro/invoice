import { cqrsHttpFilterAdapter } from '@ativoscapital/jedi.node.nestjs'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import {
  CountInvoice,
  FindAllInvoice,
  FindByFieldInvoice,
  FindByIdInvoice,
  SearchInvoice,
  SearchWithoutPaginationInvoice
} from '../../../Core'

@QueryHandler(FindByIdInvoice.Query)
export class FindByIdInvoiceQueryHandler
  implements IQueryHandler<FindByIdInvoice.Query>
{
  constructor(private handler: FindByIdInvoice.Handler) {}

  async execute(query: FindByIdInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}

@QueryHandler(FindByFieldInvoice.Query)
export class FindByFieldInvoiceQueryHandler
  implements IQueryHandler<FindByFieldInvoice.Query>
{
  constructor(private handler: FindByFieldInvoice.Handler) {}

  async execute(query: FindByFieldInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}

@QueryHandler(CountInvoice.Query)
export class CountInvoiceQueryHandler
  implements IQueryHandler<CountInvoice.Query>
{
  constructor(private handler: CountInvoice.Handler) {}

  async execute(query: CountInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}

@QueryHandler(FindAllInvoice.Query)
export class FindAllInvoiceQueryHandler
  implements IQueryHandler<FindAllInvoice.Query>
{
  constructor(private handler: FindAllInvoice.Handler) {}

  async execute(query: FindAllInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}

@QueryHandler(SearchWithoutPaginationInvoice.Query)
export class SearchWithoutPaginationInvoiceQueryHandler
  implements IQueryHandler<SearchWithoutPaginationInvoice.Query>
{
  constructor(private handler: SearchWithoutPaginationInvoice.Handler) {}

  async execute(query: SearchWithoutPaginationInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}

@QueryHandler(SearchInvoice.Query)
export class SearchInvoiceQueryHandler
  implements IQueryHandler<SearchInvoice.Query>
{
  constructor(private handler: SearchInvoice.Handler) {}

  async execute(query: SearchInvoice.Query) {
    return cqrsHttpFilterAdapter(this.handler.execute(query))
  }
}
