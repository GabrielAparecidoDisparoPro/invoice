import { AbstractEntity } from '@ativoscapital/jedi.node.core'
import {
  MongooseDefaultTypeOfId,
  MongooseDisabledTypesInNestedKeyCompletion
} from '@ativoscapital/jedi.node.mongo'
import { InvoiceEnums } from '../Enums'

export namespace InvoiceInterfaces {
  export interface IBillingDetailsAddress {
    street?: string
    number?: number
    postalCode?: string
    state?: string
    city?: string
    neighborhood?: string
    country?: string
  }

  export interface IOwner {
    id?: number
    name?: string
  }
  export interface IPlan {
    id?: number
    name?: string
  }
  export interface IPaymentDetails {
    amount?: number
    discount?: number
    tax?: number
    total?: number
    kind?: InvoiceEnums.PaymentDetailsKind
    date?: Date | string
    bank?: string
    country?: string
    IBAN?: string
    codigo?: string
  }
  export interface IPaymentMethod {
    kind?: InvoiceEnums.PaymentMethodKind
  }
  export interface IBillingDetails {
    documentNumber?: number
    legalName?: string
    address?: IBillingDetailsAddress
  }

  export interface IProps {
    owner?: IOwner
    kind?: InvoiceEnums.Kind
    name?: InvoiceEnums.Name
    date?: Date | string
    status?: InvoiceEnums.Status
    salesChannel?: InvoiceEnums.SalesChannel
    plan?: IPlan
    paymentDetails?: IPaymentDetails
    paymentMethod?: IPaymentMethod
    billingDetails?: IBillingDetails
  }

  export type TypeOfId = MongooseDefaultTypeOfId

  export type DisabledTypesInNestedKeyCompletion = [
    ...MongooseDisabledTypesInNestedKeyCompletion
  ]

  export type IEntity = AbstractEntity.WithDefaults<IProps, TypeOfId>

  /**
   * If an entity has nested relations, the fields that represent those relations
   * should be omitted from the original entity type. These fields should then
   * be redefined in the new type with their corresponding related entity types.
   *
   * @example
   * export type IEntityWithRelations = Omit<IEntity, 'user'> & {
   *   user: User.IEntity
   * }
   */
  export type IEntityWithRelations = Omit<IEntity, 0> & {}

  export type ToJSON = AbstractEntity.ToJSON<IProps, TypeOfId>
}
