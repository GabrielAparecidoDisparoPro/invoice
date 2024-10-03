import { Filter, Repository } from '@ativoscapital/jedi.node.core'
import { AbstractHandler, AbstractQuery } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Search Without Pagination Invoice use case.
 */
export namespace SearchWithoutPaginationInvoice {
  /**
   * Input type representing the expected input to Search Invoice entities.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing, and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    params: InvoiceContracts.ISearchParamsWithoutPagination
    email?: string
  }

  /**
   * Expected output, representing the search without pagination Invoice entity.
   */
  export type Output = InvoiceInterfaces.ToJSON[]

  /**
   * Query class to encapsulate the input for the SearchWithoutPagination Invoice use case.
   */
  export class Query extends AbstractQuery<Input> {}

  /**
   * Handler class for executing the Search Without Pagination Invoice use case.
   * It handles the query, processes the input, and returns the output.
   */
  export class Handler extends AbstractHandler<
    Query,
    Output,
    Repository.IMethodDefaultOptions
  > {
    /**
     * Context description for the handler.
     */
    context = 'Search Without Pagination Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the query, search without pagination the Invoice entity.
     */
    protected async useCase(input: Query): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { params, email } = input.data

      const searchParams = new InvoiceContracts.SearchParams(params)

      if (email) {
        searchParams.defaultFilter = [
          {
            column: 'auditInfo.created.email',
            operator: Filter.Operators.Equal,
            type: Filter.Types.Operator,
            value: email
          }
        ]
      }

      const searchWithoutPagination =
        await invoiceRepository.searchWithoutPagination(searchParams)

      return searchWithoutPagination.map((entity) => entity.toJSON())
    }
  }
}
