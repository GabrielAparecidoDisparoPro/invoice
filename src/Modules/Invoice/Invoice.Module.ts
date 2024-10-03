import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { InvoiceController } from './Controllers'
import { InvoiceMongooseInjection } from './Injection'

import * as commands from './Handlers/InvoiceCommands.Handlers'
import * as queries from './Handlers/InvoiceQueries.Handlers'

@Module({
  imports: [CqrsModule],
  controllers: [InvoiceController],
  providers: [
    ...Object.values(commands),
    ...Object.values(queries),
    ...Object.values(InvoiceMongooseInjection.Repositories),
    ...Object.values(InvoiceMongooseInjection.Commands),
    ...Object.values(InvoiceMongooseInjection.Queries)
  ],
  exports: []
})
export class InvoiceModule {}
