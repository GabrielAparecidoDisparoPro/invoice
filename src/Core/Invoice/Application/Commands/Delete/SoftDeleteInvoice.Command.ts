import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts } from '../../../Domain'

/**
 * Namespace for the Soft Delete Invoice use case.
 */
export namespace SoftDeleteInvoice {
  /**
   * Input type representing the expected input to soft delete the Invoice.
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
   * Expected output, representing no return value.
   */
  export type Output = undefined

  /**
   * Command class to encapsulate the input for the SoftDelete Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Soft Delete Invoice use case.
   * It handles the command, processes the input, and returns the output.
   */
  export class Handler extends AbstractHandler<Command, Output> {
    /**
     * Context description for the handler.
     */
    context = 'Soft Delete Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command and soft deletes the Invoice entity.
     */
    protected async useCase(input: Command): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { id, email } = input.data

      await invoiceRepository.softDelete(id, {
        email
      })

      return
    }
  }
}
