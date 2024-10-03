export namespace InvoiceEnums {
  export enum Kind {
    Subscription = 'Subscription',
    RechargeOmniChannel = 'RechargeOmniChannel',
    RechargeTransaction = 'RechargeTransaction',
    Feature = 'Feature'
  }

  export enum Name {
    Growth = 'Growth',
    Package500 = 'Package500',
    ExtraUser = 'ExtraUser'
  }

  export enum Status {
    Paid = 'Paid',
    Processing = 'Processing',
    Aproved = 'Aproved',
    ETC = 'ETC'
  }

  export enum SalesChannel {
    Website = 'Website',
    SaaS = 'SaaS'
  }

  export enum PaymentDetailsKind {
    Monthly = 'Monthly',
    Annual = 'Annual'
  }

  export enum PaymentMethodKind {
    CreditCard = 'CreditCard',
    Pix = 'Pix',
    PayPal = 'PayPal'
  }
}
