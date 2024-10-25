import {
  AbstractMongooseRepository,
  type MongooseSchemaType,
  mongooseDefaultEntitySchema
} from '@ativoscapital/jedi.node.mongo'
import { type Connection, type Document, Schema } from 'mongoose'
import {
  Invoice,
  InvoiceContracts,
  InvoiceEnums,
  InvoiceInterfaces
} from '../../Domain'

export namespace InvoiceMongoose {
  export const BillingDetailsAddressSchema = new Schema<
    InvoiceInterfaces.IBillingDetailsAddress,
    Document
  >(
    {
      street: { type: String, required: false },
      number: { type: Number, required: false },
      postalCode: { type: String, required: false },
      state: { type: String, required: false },
      city: { type: String, required: false },
      neighborhood: { type: String, required: false },
      country: { type: String, required: false }
    },
    {
      _id: false
    }
  )

  export const InvoiceOwnerSchema = new Schema<
    InvoiceInterfaces.IOwner,
    Document
  >(
    {
      id: { type: Number, required: false },
      name: { type: String, required: false }
    },
    {
      _id: false
    }
  )
  export const InvoicePlanSchema = new Schema<
    InvoiceInterfaces.IPlan,
    Document
  >(
    {
      id: { type: Number, required: false },
      name: { type: String, required: false }
    },
    {
      _id: false
    }
  )
  export const InvoicePaymentDetailsSchema = new Schema<
    InvoiceInterfaces.IPaymentDetails,
    Document
  >(
    {
      amount: { type: Number, required: false },
      discount: { type: Number, required: false },
      tax: { type: Number, required: false },
      total: { type: Number, required: false },
      kind: {
        type: String,
        enum: InvoiceEnums.PaymentDetailsKind,
        required: false
      },
      date: { type: Date, required: false },
      bank: { type: String, required: false },
      country: { type: String, required: false },
      IBAN: { type: String, required: false },
      codigo: { type: String, required: false }
    },
    {
      _id: false
    }
  )
  export const InvoicePaymentMethodSchema = new Schema<
    InvoiceInterfaces.IPaymentMethod,
    Document
  >(
    {
      kind: {
        type: String,
        enum: InvoiceEnums.PaymentMethodKind,
        required: false
      }
    },
    {
      _id: false
    }
  )
  export const InvoiceBillingDetailsSchema = new Schema<
    InvoiceInterfaces.IBillingDetails,
    Document
  >(
    {
      documentNumber: { type: Number, required: false },
      legalName: { type: String, required: false },
      address: { type: BillingDetailsAddressSchema, required: false }
    },
    {
      _id: false
    }
  )
  export const InvoiceSchema = new Schema<
    MongooseSchemaType<InvoiceInterfaces.IEntity, InvoiceInterfaces.TypeOfId>,
    Document
  >({
    ...mongooseDefaultEntitySchema,
    owner: { type: InvoiceOwnerSchema, required: false },
    kind: { type: String, enum: InvoiceEnums.Kind, required: false },
    name: { type: String, enum: InvoiceEnums.Name, required: false },
    date: { type: Date, required: false },
    status: { type: String, enum: InvoiceEnums.Status, required: false },
    salesChannel: {
      type: String,
      enum: InvoiceEnums.SalesChannel,
      required: false
    },
    plan: { type: InvoicePlanSchema, required: false },
    paymentDetails: { type: InvoicePaymentDetailsSchema, required: false },
    paymentMethod: { type: InvoicePaymentMethodSchema, required: false },
    billingDetails: { type: InvoiceBillingDetailsSchema, required: false }
  })

  export class Repository
    extends AbstractMongooseRepository<
      Invoice,
      InvoiceInterfaces.IProps,
      InvoiceInterfaces.IEntity,
      InvoiceInterfaces.ToJSON,
      InvoiceInterfaces.TypeOfId,
      InvoiceInterfaces.IEntityWithRelations
    >
    implements InvoiceContracts.Repository
  {
    constructor(connection?: Connection) {
      super({
        connection,
        modelName: Invoice.name,
        collectionName: 'invoices',
        Entity: Invoice,
        filterableFields: ['id', 'auditInfo.created.at', 'state', 'status'],
        sortableFields: ['auditInfo.created.at'],
        Schema: InvoiceSchema
      })
    }
  }
}
