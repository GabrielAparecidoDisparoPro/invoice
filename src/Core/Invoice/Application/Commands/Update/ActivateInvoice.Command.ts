import { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Activate Invoice use case.
 */
export namespace ActivateInvoice {
  /**
   * Input type representing the expected input to activate a Invoice.
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
   * Expected output, representing the activated Invoice entity.
   */
  export type Output = InvoiceInterfaces.ToJSON

  /**
   * Command class to encapsulate the input for the Activate Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Activate Invoice use case.
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
    context = 'Activate Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, activates the Invoice entity, and updates the repository.
     */
    protected async useCase(
      input: Command,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const invoice = await invoiceRepository.activate(input.data.id, options)

      return invoice.toJSON()
    }
  }
}
