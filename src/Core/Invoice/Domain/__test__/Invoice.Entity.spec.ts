import { describe, expect, it } from 'vitest'
import { Invoice } from '../Invoice.Entity'
import { RandomInvoiceFactory } from '../Mocks/RandomInvoiceFactory.Mock'

describe('Invoice Tests', (): void => {
  const factory = new RandomInvoiceFactory()

  const invoice = factory.createOne()

  it('should create an random entity and convert to json', () => {
    expect(invoice.id).toBeDefined()
    expect(invoice.toJSON()).toBeDefined()
  })

  it('should create an entity', () => {
    const entity = new Invoice(
      {
        ...invoice.toJSON()
      },
      {
        ...invoice.toJSON()
      }
    )

    expect(entity.id).toBeDefined()
  })

  it('should create an entity from the factory', () => {
    const entity = Invoice.Factory(
      {
        ...invoice.toJSON()
      },
      {
        ...invoice.toJSON()
      }
    )

    expect(entity.id).toBeDefined()
  })
})
