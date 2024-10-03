import { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractHandler, AbstractQuery } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Find All Invoice use case.
 */
export namespace FindAllInvoice {
  /**
   * Input type representing the expected input to Find All Invoice.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing, and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    email?: string
  }

  /**
   * Expected output, representing an array of Invoice entities.
   */
  export type Output = InvoiceInterfaces.ToJSON[]

  /**
   * Query class to encapsulate the input for the FindAll Invoice use case.
   */
  export class Query extends AbstractQuery<Input> {}

  /**
   * Handler class for executing the FindAll Invoice use case.
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
    context = 'Find All Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the query, find all the Invoice entities.
     */
    protected async useCase(
      input: Query,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { email } = input.data

      const entities = await invoiceRepository.findAll({
        ...options,
        email
      })

      return entities.map((entity) => entity.toJSON())
    }
  }
}
