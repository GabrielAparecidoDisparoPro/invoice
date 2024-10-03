import { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import { Invoice, InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Insert Invoice use case.
 */
export namespace InsertInvoice {
  /**
   * Input type representing the expected input to insert one Invoice.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    data: InvoiceInterfaces.IProps
    email?: string
  }

  /**
   * Expected output, representing an array of Invoice entities.
   */
  export type Output = InvoiceInterfaces.ToJSON

  /**
   * Command class to encapsulate the input for the Insert Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Insert Invoice use case.
   * It handles the command, processes the input, and returns the output.
   */
  export class Handler extends AbstractHandler<
    Command,
    Output,
    Repository.IMethodDefaultOptions
  > {
    /**
     * Context description for the handler.
     */
    context = 'Insert Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, creates Invoice entity, and insert it into the repository.
     */
    protected async useCase(
      input: Command,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { data, email } = input.data

      const entity = Invoice.Factory(data, {
        auditInfo: {
          created: {
            at: new Date(),
            email: email ?? null
          },
          deleted: null,
          updated: null
        }
      })

      const invoice = await invoiceRepository.insert(entity, options)

      return invoice.toJSON()
    }
  }
}
