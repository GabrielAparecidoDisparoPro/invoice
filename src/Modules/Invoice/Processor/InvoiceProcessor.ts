import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Inject, Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { InvoiceEnums, UpdateInvoice } from '../../../Core'

@Injectable()
@Processor('invoice-queue')
export class InvoiceProcessor extends WorkerHost {
  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {
    super()
  }

  async process(job: Job) {
    try {
      await this.commandBus.execute(
        new UpdateInvoice.Command({
          data: {
            status: InvoiceEnums.Status.Paid
          },
          id: job.data.id
        })
      )
    } catch (_error) {}
  }
}
