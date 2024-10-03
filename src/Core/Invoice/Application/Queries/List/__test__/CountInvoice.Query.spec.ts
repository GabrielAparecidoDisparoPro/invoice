import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { CountInvoice } from '../CountInvoice.Query'

describe('Count Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  const email = 'testing@mail.com'

  let entities: Invoice[]

  const handler = new CountInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    entities = structure.getEntityStructure('invoice')._10RandomEntities

    await invoiceRepository.insertMany(
      entities.map((entity) => {
        entity.changeOwnerEmail(email)

        return entity
      })
    )
  })

  it('should execute the find By Id handler', async () => {
    const spyCount = vitest.spyOn(invoiceRepository, 'count')

    const handlerResult = await handler.execute(
      new CountInvoice.Query({
        params: {}
      })
    )

    expect(
      handlerResult.count,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    const handlerResultWithEmail = await handler.execute(
      new CountInvoice.Query({
        params: {},
        email
      })
    )

    expect(
      handlerResultWithEmail.count,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    expect(
      spyCount,
      'The repository did not call the `count` method'
    ).toHaveBeenCalledTimes(2)
  })
})
