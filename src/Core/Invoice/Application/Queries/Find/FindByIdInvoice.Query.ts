import { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractHandler, AbstractQuery } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Find By Id Invoice use case.
 */
export namespace FindByIdInvoice {
  /**
   * Input type representing the expected input to Find By Id a Invoice.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing, and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    id: string
    email?: string
  }

  /**
   * Expected output, representing the Invoice entity.
   */
  export type Output = InvoiceInterfaces.ToJSON

  /**
   * Query class to encapsulate the input for the FindById Invoice use case.
   */
  export class Query extends AbstractQuery<Input> {}

  /**
   * Handler class for executing the FindById Invoice use case.
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
    context = 'Find By Id Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the query, and find one Invoice entity by its id.
     */
    protected async useCase(
      input: Query,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { id, email } = input.data

      const invoice = await invoiceRepository.findById(id, {
        ...options,
        email
      })

      return invoice.toJSON()
    }
  }
}
