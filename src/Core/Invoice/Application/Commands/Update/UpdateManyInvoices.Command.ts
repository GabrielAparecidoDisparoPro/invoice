import type { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import type { InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Update Many Invoice use case.
 */
export namespace UpdateManyInvoices {
  /**
   * Input type representing the expected input to update multiple Invoice entities.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    ids: string[]
    email?: string
    data: Partial<Omit<InvoiceInterfaces.IProps, 'id'>>
  }

  /**
   * Expected output, representing no return value.
   */
  export type Output = undefined

  /**
   * Command class to encapsulate the input for the Update Many Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Update Many Invoice use case.
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
    context = 'Update Many Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, updates multiple Invoice entities, and updates the repository.
     */
    protected async useCase(input: Command): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { data, ids, email } = input.data

      await invoiceRepository.updateMany(ids, data, { email })

      return
    }
  }
}
