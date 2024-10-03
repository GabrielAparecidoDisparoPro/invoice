import { AbstractEntity, Repository } from '@ativoscapital/jedi.node.core'
import { AbstractCommand, AbstractHandler } from '@ativoscapital/jedi.node.cqrs'
import { Invoice, InvoiceContracts, InvoiceInterfaces } from '../../../Domain'

/**
 * Namespace for the Replace Invoice use case.
 */
export namespace ReplaceInvoice {
  /**
   * Input type representing the expected input to replace a Invoice entity.
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
    data: {
      state?: AbstractEntity.States
      auditInfo?: AbstractEntity.IJsonAuditInfo
    } & Omit<InvoiceInterfaces.ToJSON, 'id' | 'state' | 'auditInfo'>
  }

  /**
   * Expected output, representing the replaced Invoice entity.
   */
  export type Output = InvoiceInterfaces.ToJSON

  /**
   * Command class to encapsulate the input for the Replace Invoice use case.
   */
  export class Command extends AbstractCommand<Input> {}

  /**
   * Handler class for executing the Replace Invoice use case.
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
    context = 'Replace Invoice Handler'

    constructor(
      private readonly repositories: {
        invoiceRepository: InvoiceContracts.Repository
      }
    ) {
      super()
    }

    /**
     * Processes the command, replaces the Invoice entity, and updates the repository.
     */
    protected async useCase(
      input: Command,
      options?: Repository.IMethodDefaultOptions
    ): Promise<Output> {
      const { invoiceRepository } = this.repositories

      const { auditInfo, state, ...rest } = input.data.data

      const invoiceAsEntity = Invoice.Factory(rest, {
        auditInfo: auditInfo as unknown as AbstractEntity.IAuditInfo,
        id: input.data.id,
        state
      })

      const invoice = await invoiceRepository.replace(invoiceAsEntity, {
        ...options,
        email: input.data.email
      })

      return invoice.toJSON()
    }
  }
}
