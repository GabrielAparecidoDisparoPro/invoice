import type { Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import {
  Invoice,
  type InvoiceContracts,
  type InvoiceInterfaces
} from '../../../Domain'

/**
 * Namespace for the Insert Many Invoice use case.
 */
export namespace InsertManyInvoices {
  /**
   * Input type representing the expected input to insert many Invoice.
   *
   * Should use typia for validation.
   * Generates sdk, e2e testing and swagger automatically.
   *
   * @see {@link https://typia.io/}
   * @see {@link https://nestia.io/docs/sdk/}
   */
  export type Input = {
    data: InvoiceInterfaces.IProps[]
    email?: string
  }

  /**
   * Expected output, representing an array of Invoice entities.
   */
  export type Output = InvoiceInterfaces.ToJSON[]

  /**
   * Command class to encapsulate the input for the Insert Many Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Insert Many Invoice use case.
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
    context = 'Insert Many Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, creates Invoice entities, and inserts them into the repository.
     */
    protected async useCase(input: Command): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { data, email } = input.data

      const entities = data.map((props) =>
        Invoice.Factory(props, {
          auditInfo: {
            created: {
              at: new Date(),
              email: email ?? null
            },
            deleted: null,
            updated: null
          }
        })
      )

      const insertedEntities = await invoiceRepository.insertMany(entities)

      return insertedEntities.map((entity) => entity.toJSON())
    }
  }
}
