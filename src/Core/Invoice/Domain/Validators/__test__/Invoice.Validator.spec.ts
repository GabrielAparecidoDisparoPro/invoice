import { describe, expect, it } from 'vitest'
import { Invoice } from '../../Invoice.Entity'
import { RandomInvoiceFactory } from '../../Mocks'
import { InvoiceClassValidators } from '../Invoice.Validator'

describe('ValidatorFields Tests', () => {
  const random = new RandomInvoiceFactory().createOne().toJSON()

  it('should initialize errors and validatedData variables with null', () => {
    const validator = new InvoiceClassValidators.RootValidator(
      {} as unknown as InvoiceClassValidators.RootValidator
    )
    expect(validator.errors?.length).toStrictEqual(0)
    expect(validator.validatedData).toBeNull()
  })

  it('should validate with errors', () => {
    const validator = new InvoiceClassValidators.RootValidator(
      {} as unknown as InvoiceClassValidators.RootValidator
    )
    expect(() =>
      validator.validate({
        silent: true
      })
    ).toThrow()
    expect(validator.validatedData).toBeNull()
  })

  it('should validate without errors', () => {
    const validator = new InvoiceClassValidators.RootValidator(random)
    expect(validator.validate()).toBeTruthy()
    expect(validator.validatedData).toStrictEqual({
      ...random
    })
    expect(validator.errors.length).toStrictEqual(0)
  })

  it('should validate an entity', () => {
    const truthy = Invoice.Factory({
      ...random
    })

    expect(truthy.validate()).toBeTruthy()

    expect(() => {
      Invoice.Factory({} as unknown as InvoiceClassValidators.RootValidator)
    }).toThrow()
  })
})
