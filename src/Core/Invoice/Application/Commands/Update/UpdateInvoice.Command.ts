import { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Update Invoice use case.
 */
export namespace UpdateInvoice {
  /**
   * Input type representing the expected input to update a single Invoice entity.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    id: string
    email?: string
    data: Partial<Omit<InvoiceInterfaces.IEntity, 'id'>>
  }

  /**
   * Expected output, representing the updated Invoice entity.
   */
  export type Output = InvoiceInterfaces.ToJSON

  /**
   * Command class to encapsulate the input for the Update Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Update Invoice use case.
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
    context = 'Update Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, updates the specified Invoice entity, and updates the repository.
     */
    protected async useCase(
      input: Command,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { data, id, email } = input.data

      const invoice = await invoiceRepository.update(id, data, {
        ...options,
        email
      })

      return invoice.toJSON()
    }
  }
}
