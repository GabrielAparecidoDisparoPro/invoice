import { Filter, Logger } from '@ativoscapital/jedi.node.core'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { Cron, CronExpression } from '@nestjs/schedule'
import type { Queue } from 'bullmq'
import { SearchWithoutPaginationInvoice } from '../../../../Core'

@Injectable()
export class UpdateStatusInvoice {
  private logger = new Logger()

  private isRunning = false

  private locked = true

  constructor(
    private readonly queryBus: QueryBus,
    @InjectQueue('invoice-queue') private invoiceQueue: Queue
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async execute() {
    try {
      const invoices = await this.queryBus.execute(
        new SearchWithoutPaginationInvoice.Query({
          params: {
            filter: [
              {
                column: 'status',
                operator: Filter.Operators.Equal,
                value: 'Processing',
                type: Filter.Types.String
              }
            ]
          }
        })
      )
      for (const invoice of invoices) {
        await this.invoiceQueue.add('process-invoice', invoice)
      }
    } catch (error) {
      console.log(error)
      this.logger.error(JSON.stringify(error))
    } finally {
      this.isRunning = false
    }
  }
}

/*  await this.queryBus.execute(
        new UpdateManyInvoices.Command({
          data : {
            status :InvoiceEnums.Status.Approved
          },
          ids : 
        })
      ) */
