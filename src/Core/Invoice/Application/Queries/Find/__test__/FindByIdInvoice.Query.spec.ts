import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { FindByIdInvoice } from '../FindByIdInvoice.Query'

describe('FindById Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new FindByIdInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the find By Id handler', async () => {
    const spyFindById = vitest.spyOn(invoiceRepository, 'findById')

    const handlerResult = await handler.execute(
      new FindByIdInvoice.Query({
        id: randomInvoice.id.toString()
      })
    )

    expect(
      spyFindById,
      'The repository did not call the `findById` method'
    ).toHaveBeenCalledTimes(1)

    expect(
      handlerResult,
      'The entity resulted in find by id handler, did not match with expected random entity'
    ).toStrictEqual(randomInvoice.toJSON())
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new FindByIdInvoice.Query({
          id: 'fake'
        }),
        {
          execution: {
            silent: true
          }
        }
      )
    }, 'It should throws error when not found').rejects.toThrow()
  })
})
