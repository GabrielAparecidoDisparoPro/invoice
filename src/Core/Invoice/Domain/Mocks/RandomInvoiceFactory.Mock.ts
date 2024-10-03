import {
  AbstractRandomEntityFactory,
  RandomUtils
} from '@ativoscapital/jedi.node.core'
import { ObjectIdEntityId } from '@ativoscapital/jedi.node.mongo'
import { InvoiceEnums } from '../Enums'
import { InvoiceInterfaces } from '../Interfaces/Invoice.Interfaces'
import { Invoice } from '../Invoice.Entity'

export class RandomInvoiceFactory extends AbstractRandomEntityFactory<
  Invoice,
  InvoiceInterfaces.IProps,
  InvoiceInterfaces.TypeOfId
> {
  constructor() {
    super(
      Invoice,
      {
        // Functions to Generate Properties
        owner: () => ({
          id: RandomUtils.number,
          name: RandomUtils.string
        }),
        kind: () => RandomUtils.fromEnum(InvoiceEnums.Kind),
        name: () => RandomUtils.fromEnum(InvoiceEnums.Name),
        date: RandomUtils.date,
        status: () => RandomUtils.fromEnum(InvoiceEnums.Status),
        salesChannel: () => RandomUtils.fromEnum(InvoiceEnums.SalesChannel),
        plan: () => ({
          id: RandomUtils.number,
          name: RandomUtils.string
        }),
        paymentDetails: () => ({
          amount: RandomUtils.number,
          discount: RandomUtils.number,
          tax: RandomUtils.number,
          total: RandomUtils.number,
          kind: () => RandomUtils.fromEnum(InvoiceEnums.PaymentDetailsKind),
          date: RandomUtils.date,
          bank: RandomUtils.string,
          country: RandomUtils.string,
          IBAN: RandomUtils.string,
          codigo: RandomUtils.string
        }),
        paymentMethod: () => ({
          kind: () => RandomUtils.fromEnum(InvoiceEnums.PaymentMethodKind)
        }),
        billingDetails: () => ({
          documentNumber: RandomUtils.number,
          legalName: RandomUtils.string,
          address: () => ({
            street: RandomUtils.string,
            number: RandomUtils.number,
            postalCode: RandomUtils.string,
            state: RandomUtils.string,
            city: RandomUtils.string,
            neighborhood: RandomUtils.string,
            country: RandomUtils.string
          })
        })
      },
      {
        // Function to Generate Defaults
        id: () => new ObjectIdEntityId().value
      }
    )
  }
}
