import { cqrsHttpFilterAdapter } from '@ativoscapital/jedi.node.nestjs'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import {
  ActivateInvoice,
  DeactivateInvoice,
  DeleteInvoice,
  InsertInvoice,
  InsertManyInvoices,
  ReplaceInvoice,
  SoftDeleteInvoice,
  UpdateInvoice,
  UpdateManyInvoices
} from '../../../Core'

@CommandHandler(InsertInvoice.Command)
export class InsertInvoiceCommandHandler
  implements ICommandHandler<InsertInvoice.Command>
{
  constructor(private handler: InsertInvoice.Handler) {}

  async execute(command: InsertInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(InsertManyInvoices.Command)
export class InsertManyInvoicesCommandHandler
  implements ICommandHandler<InsertManyInvoices.Command>
{
  constructor(private handler: InsertManyInvoices.Handler) {}

  async execute(command: InsertManyInvoices.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(DeleteInvoice.Command)
export class DeleteInvoiceCommandHandler
  implements ICommandHandler<DeleteInvoice.Command>
{
  constructor(private handler: DeleteInvoice.Handler) {}

  async execute(command: DeleteInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(SoftDeleteInvoice.Command)
export class SoftDeleteInvoiceCommandHandler
  implements ICommandHandler<SoftDeleteInvoice.Command>
{
  constructor(private handler: SoftDeleteInvoice.Handler) {}

  async execute(command: SoftDeleteInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(ActivateInvoice.Command)
export class ActivateInvoiceCommandHandler
  implements ICommandHandler<ActivateInvoice.Command>
{
  constructor(private handler: ActivateInvoice.Handler) {}

  async execute(command: ActivateInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(DeactivateInvoice.Command)
export class DeactivateInvoiceCommandHandler
  implements ICommandHandler<DeactivateInvoice.Command>
{
  constructor(private handler: DeactivateInvoice.Handler) {}

  async execute(command: DeactivateInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(UpdateManyInvoices.Command)
export class UpdateManyInvoicesCommandHandler
  implements ICommandHandler<UpdateManyInvoices.Command>
{
  constructor(private handler: UpdateManyInvoices.Handler) {}

  async execute(command: UpdateManyInvoices.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(UpdateInvoice.Command)
export class UpdateInvoiceCommandHandler
  implements ICommandHandler<UpdateInvoice.Command>
{
  constructor(private handler: UpdateInvoice.Handler) {}

  async execute(command: UpdateInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}

@CommandHandler(ReplaceInvoice.Command)
export class ReplaceInvoiceCommandHandler
  implements ICommandHandler<ReplaceInvoice.Command>
{
  constructor(private handler: ReplaceInvoice.Handler) {}

  async execute(command: ReplaceInvoice.Command) {
    return cqrsHttpFilterAdapter(this.handler.execute(command))
  }
}
