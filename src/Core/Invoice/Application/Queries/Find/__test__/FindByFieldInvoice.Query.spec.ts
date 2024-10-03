import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { FindByFieldInvoice } from '../FindByFieldInvoice.Query'

describe('FindByField Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const email = 'created@mail.com'

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new FindByFieldInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    randomInvoice.changeOwnerEmail(email)

    const otherEntity = structure
      .getEntityStructure('invoice')
      .randomFactory.createOne(
        {},
        {
          auditInfo: {
            created: {
              at: new Date(),
              email: 'fake@mail.com'
            },
            deleted: null,
            updated: null
          }
        }
      )

    await invoiceRepository.insertMany([otherEntity, randomInvoice])
  })

  it('should execute the find by field handler', async () => {
    const spyFindByField = vitest.spyOn(invoiceRepository, 'findByField')

    const handlerResult = await handler.execute(
      new FindByFieldInvoice.Query({
        field: 'auditInfo.created.email',
        value: email
      })
    )

    expect(
      spyFindByField,
      'The repository did not call the `findByField` method'
    ).toHaveBeenCalledTimes(1)

    expect(
      handlerResult,
      'The entity resulted in find by field handler, did not match with expected random entity'
    ).toStrictEqual(randomInvoice.toJSON())
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new FindByFieldInvoice.Query({
          field: 'id',
          value: 'fake'
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
