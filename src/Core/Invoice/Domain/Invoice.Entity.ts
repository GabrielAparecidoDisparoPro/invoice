import { AbstractEntity } from '@ativoscapital/jedi.node.core'
import { ObjectIdEntityId } from '@ativoscapital/jedi.node.mongo'
import { InvoiceEnums } from './Enums'
import { InvoiceInterfaces } from './Interfaces'
import { InvoiceClassValidators } from './Validators'

export class Invoice
  extends AbstractEntity<InvoiceInterfaces.IEntity, InvoiceInterfaces.TypeOfId>
  implements InvoiceInterfaces.IProps
{
  constructor(
    props: InvoiceInterfaces.IProps,
    defaults?: AbstractEntity.IDefaultsInput<InvoiceInterfaces.TypeOfId>
  ) {
    super({
      props,
      uniqueId: new ObjectIdEntityId(defaults?.id),
      validator: new InvoiceClassValidators.RootValidator(props),
      defaults
    })
  }

  // Getters

  get owner(): InvoiceInterfaces.IOwner | undefined {
    return this.props.owner
  }

  changeOwner(newOwner: InvoiceInterfaces.IOwner) {
    this.props.owner = newOwner
    this.update()
  }

  get kind(): InvoiceEnums.Kind | undefined {
    return this.props.kind
  }

  changeKind(newKind: InvoiceEnums.Kind) {
    this.props.kind = newKind
    this.update()
  }

  get name(): InvoiceEnums.Name | undefined {
    return this.props.name
  }

  changeName(newName: InvoiceEnums.Name) {
    this.props.name = newName
    this.update()
  }

  get date(): Date | string | undefined {
    return this.props.date
  }

  changeDate(newDate: Date) {
    this.props.date = newDate
    this.update()
  }

  get status(): InvoiceEnums.Status | undefined {
    return this.props.status
  }

  changeStatus(newStatus: InvoiceEnums.Status) {
    this.props.status = newStatus
    this.update()
  }

  get salesChannel(): InvoiceEnums.SalesChannel | undefined {
    return this.props.salesChannel
  }

  changeSalesChannel(newSalesChannel: InvoiceEnums.SalesChannel) {
    this.props.salesChannel = newSalesChannel
    this.update()
  }

  get plan(): InvoiceInterfaces.IPlan | undefined {
    return this.props.plan
  }

  changePlan(newPlan: InvoiceInterfaces.IPlan) {
    this.props.plan = newPlan
    this.update()
  }

  get paymentDetails(): InvoiceInterfaces.IPaymentDetails | undefined {
    return this.props.paymentDetails
  }

  changePaymentDetails(newPaymentDetails: InvoiceInterfaces.IPaymentDetails) {
    this.props.paymentDetails = newPaymentDetails
    this.update()
  }

  get paymentMethod(): InvoiceInterfaces.IPaymentMethod | undefined {
    return this.props.paymentMethod
  }

  changePaymentMethod(newPaymentMethod: InvoiceInterfaces.IPaymentMethod) {
    this.props.paymentMethod = newPaymentMethod
    this.update()
  }

  get billingDetails(): InvoiceInterfaces.IBillingDetails | undefined {
    return this.props.billingDetails
  }

  changeBillingDetails(newBillingDetails: InvoiceInterfaces.IBillingDetails) {
    this.props.billingDetails = newBillingDetails
    this.update()
  }
}

export namespace Invoice {
  export function Factory(
    props: InvoiceInterfaces.IProps,
    defaults?: AbstractEntity.IDefaultsInput<InvoiceInterfaces.TypeOfId>
  ) {
    return new Invoice(props, defaults)
  }
}
