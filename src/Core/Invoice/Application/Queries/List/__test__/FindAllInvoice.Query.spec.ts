import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { FindAllInvoice } from '../FindAllInvoice.Query'

describe('FindAll Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let entities: Invoice[]

  const handler = new FindAllInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    entities = structure.getEntityStructure('invoice')._10RandomEntities

    await invoiceRepository.insertMany(entities)
  })

  it('should execute the find By Id handler', async () => {
    const spyFindAll = vitest.spyOn(invoiceRepository, 'findAll')

    const handlerResult = await handler.execute(new FindAllInvoice.Query({}))

    expect(
      spyFindAll,
      'The repository did not call the `findAll` method'
    ).toHaveBeenCalledTimes(1)

    expect(
      handlerResult.length,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    for (const random of entities) {
      const entity = handlerResult.find(
        (item) => item.id.toString() === random.id.toString()
      )

      if (!entity) {
        throw new Error(`Entity of id ${random.id} was not found`)
      }

      expect(
        entity,
        'The entity resulted in find by id handler, did not match with expected random entity'
      ).toStrictEqual(random.toJSON())
    }
  })
})
