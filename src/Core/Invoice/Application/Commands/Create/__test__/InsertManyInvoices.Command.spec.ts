import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { InsertManyInvoices } from '../InsertManyInvoices.Command'

describe('Insert Many Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let entities: Invoice[]

  const handler = new InsertManyInvoices.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    entities = structure.getEntityStructure('invoice')._10RandomEntities
  })

  it('should execute the insertMany handler', async () => {
    const spyInsertMany = vitest.spyOn(invoiceRepository, 'insertMany')

    const handlerResult = await handler.execute(
      new InsertManyInvoices.Command({
        data: entities.map((entity) => entity.toJSON())
      })
    )

    expect(
      handlerResult.length,
      'The handler did not returned all expected entities correctly'
    ).toStrictEqual(entities.length)

    expect(
      spyInsertMany,
      'The repository did not call the `insertMany` method'
    ).toHaveBeenCalledTimes(1)

    const foundEntities = await invoiceRepository.findAll()

    expect(
      foundEntities.length,
      'The handler did not inserted all entities correctly'
    ).toStrictEqual(entities.length)
  })
})
