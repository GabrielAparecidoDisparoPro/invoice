import { AbstractTestingStructure } from '@ativoscapital/jedi.node.core'
import {
  MongooseDisabledTypesInNestedKeyCompletion,
  MongooseMethodOptions
} from '@ativoscapital/jedi.node.mongo'
import {
  Invoice,
  InvoiceInterfaces,
  RandomInvoiceFactory
} from '../../../Domain'
import { InvoiceMongoose } from '../InvoiceMongoose'

export class InvoiceMongooseTestingStructure extends AbstractTestingStructure<{
  invoice: {
    Entity: Invoice
    IProps: InvoiceInterfaces.IProps
    IEntityWithRelations: InvoiceInterfaces.IEntityWithRelations
    TypeOfId: InvoiceInterfaces.TypeOfId
    DefaultOptions: MongooseMethodOptions
    Repository: InvoiceMongoose.Repository
    DisabledTypesInNestedKeyCompletion: MongooseDisabledTypesInNestedKeyCompletion
  }
}> {
  constructor() {
    const invoiceRandomFactory = new RandomInvoiceFactory()

    super(
      {
        invoice: {
          EntityClass: Invoice,
          randomFactory: invoiceRandomFactory
        }
      },
      {
        invoice: {
          createRepository: () => new InvoiceMongoose.Repository()
        }
      }
    )
  }
}
