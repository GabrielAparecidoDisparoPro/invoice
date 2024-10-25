import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { InvoiceController } from './Controllers'
import { InvoiceMongooseInjection } from './Injection'

import { BullModule } from '@nestjs/bullmq'
import * as commands from './Handlers/InvoiceCommands.Handlers'
import * as queries from './Handlers/InvoiceQueries.Handlers'
import { InvoiceProcessor } from './Processor/InvoiceProcessor'
import { UpdateStatusInvoice } from './Tasks'

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: 'invoice-queue'
    })
  ],
  controllers: [InvoiceController],
  providers: [
    ...Object.values(commands),
    ...Object.values(queries),
    ...Object.values(InvoiceMongooseInjection.Repositories),
    ...Object.values(InvoiceMongooseInjection.Commands),
    ...Object.values(InvoiceMongooseInjection.Queries),
    UpdateStatusInvoice,
    InvoiceProcessor
  ],
  exports: []
})
export class InvoiceModule {}
