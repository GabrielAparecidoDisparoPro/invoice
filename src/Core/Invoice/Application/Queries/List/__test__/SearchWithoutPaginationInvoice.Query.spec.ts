import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { SearchWithoutPaginationInvoice } from '../SearchWithoutPaginationInvoice.Query'

describe('Search Without Pagination Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  const email = 'testing@mail.com'

  let entities: Invoice[]

  const handler = new SearchWithoutPaginationInvoice.Handler({
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

  it('should execute the search without pagination handler', async () => {
    const spySearchWithoutPagination = vitest.spyOn(
      invoiceRepository,
      'searchWithoutPagination'
    )

    const handlerResult = await handler.execute(
      new SearchWithoutPaginationInvoice.Query({
        params: {}
      })
    )

    expect(
      handlerResult.length,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    const handlerResultWithEmail = await handler.execute(
      new SearchWithoutPaginationInvoice.Query({
        params: {},
        email
      })
    )

    expect(
      handlerResultWithEmail.length,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    expect(
      spySearchWithoutPagination,
      'The repository did not call the `searchWithoutPagination` method'
    ).toHaveBeenCalledTimes(2)

    for (const entity of handlerResult) {
      const randomEntity = entities.find(
        (item) => item.id.toString() === entity.id.toString()
      )

      if (!randomEntity) {
        throw new Error(`Entity of id ${entity.id} not found`)
      }

      expect(randomEntity.toJSON()).toStrictEqual(entity)
    }
  })
})
