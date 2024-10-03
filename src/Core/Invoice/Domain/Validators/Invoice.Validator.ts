import { ClassValidator, DateUtils } from '@ativoscapital/jedi.node.core'
import * as ct from 'class-transformer'
import * as cv from 'class-validator'
import { InvoiceEnums } from '../Enums'
import type { InvoiceInterfaces } from '../Interfaces'

export namespace InvoiceClassValidators {
  export class BillingDetailsAddress
    implements InvoiceInterfaces.IBillingDetailsAddress
  {
    @cv.IsOptional()
    @cv.IsString()
    street?: string

    @cv.IsOptional()
    @cv.IsNumber()
    number?: number

    @cv.IsOptional()
    @cv.IsString()
    postalCode?: string

    @cv.IsOptional()
    @cv.IsString()
    state?: string

    @cv.IsOptional()
    @cv.IsString()
    city?: string

    @cv.IsOptional()
    @cv.IsString()
    neighborhood?: string

    @cv.IsOptional()
    @cv.IsString()
    country?: string

    constructor(props: BillingDetailsAddress) {
      Object.assign(this, ct.plainToInstance(BillingDetailsAddress, props))
    }
  }

  export class InvoiceOwner implements InvoiceInterfaces.IOwner {
    @cv.IsOptional()
    @cv.IsNumber()
    id?: number

    @cv.IsOptional()
    @cv.IsString()
    name?: string

    constructor(props: InvoiceOwner) {
      Object.assign(this, ct.plainToInstance(InvoiceOwner, props))
    }
  }

  export class InvoicePlan implements InvoiceInterfaces.IPlan {
    @cv.IsOptional()
    @cv.IsNumber()
    id?: number

    @cv.IsOptional()
    @cv.IsString()
    name?: string

    constructor(props: InvoicePlan) {
      Object.assign(this, ct.plainToInstance(InvoicePlan, props))
    }
  }

  export class InvoicePaymentDetails
    implements InvoiceInterfaces.IPaymentDetails
  {
    @cv.IsOptional()
    @cv.IsNumber()
    amount?: number

    @cv.IsOptional()
    @cv.IsNumber()
    discount?: number

    @cv.IsOptional()
    @cv.IsNumber()
    tax?: number

    @cv.IsOptional()
    @cv.IsNumber()
    total?: number

    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.PaymentDetailsKind)
    kind?: InvoiceEnums.PaymentDetailsKind

    @cv.IsOptional()
    @cv.IsDate()
    @ct.Transform(({ value }) => DateUtils.getDateOrNull(value))
    date?: Date | string

    @cv.IsOptional()
    @cv.IsString()
    bank?: string

    @cv.IsOptional()
    @cv.IsString()
    country?: string

    @cv.IsOptional()
    @cv.IsString()
    IBAN?: string

    @cv.IsOptional()
    @cv.IsString()
    codigo?: string

    constructor(props: InvoicePaymentDetails) {
      Object.assign(this, ct.plainToInstance(InvoicePaymentDetails, props))
    }
  }

  export class InvoicePaymentMethod
    implements InvoiceInterfaces.IPaymentMethod
  {
    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.PaymentMethodKind)
    kind?: InvoiceEnums.PaymentMethodKind

    constructor(props: InvoicePaymentMethod) {
      Object.assign(this, ct.plainToInstance(InvoicePaymentMethod, props))
    }
  }

  export class InvoiceBillingDetails
    implements InvoiceInterfaces.IBillingDetails
  {
    @cv.IsOptional()
    @cv.IsNumber()
    documentNumber?: number

    @cv.IsOptional()
    @cv.IsString()
    legalName?: string

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => BillingDetailsAddress)
    @ct.Transform(({ value }) => new BillingDetailsAddress(value))
    address?: InvoiceInterfaces.IBillingDetailsAddress

    constructor(props: InvoiceBillingDetails) {
      Object.assign(this, ct.plainToInstance(InvoiceBillingDetails, props))
    }
  }

  export class RootValidator
    extends ClassValidator<InvoiceInterfaces.IProps>
    implements InvoiceInterfaces.IProps
  {
    // Root Validators

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => InvoiceOwner)
    @ct.Transform(({ value }) => new InvoiceOwner(value))
    owner?: InvoiceInterfaces.IOwner

    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.Kind)
    kind?: InvoiceEnums.Kind

    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.Name)
    name?: InvoiceEnums.Name

    @cv.IsOptional()
    @cv.IsDate()
    @ct.Transform(({ value }) => DateUtils.getDateOrNull(value))
    date?: Date | string

    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.Status)
    status?: InvoiceEnums.Status

    @cv.IsOptional()
    @cv.IsEnum(InvoiceEnums.SalesChannel)
    salesChannel?: InvoiceEnums.SalesChannel

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => InvoicePlan)
    @ct.Transform(({ value }) => new InvoicePlan(value))
    plan?: InvoiceInterfaces.IPlan

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => InvoicePaymentDetails)
    @ct.Transform(({ value }) => new InvoicePaymentDetails(value))
    paymentDetails?: InvoiceInterfaces.IPaymentDetails

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => InvoicePaymentMethod)
    @ct.Transform(({ value }) => new InvoicePaymentMethod(value))
    paymentMethod?: InvoiceInterfaces.IPaymentMethod

    @cv.IsOptional()
    @cv.ValidateNested()
    @ct.Type(() => InvoiceBillingDetails)
    @ct.Transform(({ value }) => new InvoiceBillingDetails(value))
    billingDetails?: InvoiceInterfaces.IBillingDetails

    constructor(props: InvoiceInterfaces.IProps) {
      super(props, RootValidator)
      Object.assign(this, props)
    }
  }
}
