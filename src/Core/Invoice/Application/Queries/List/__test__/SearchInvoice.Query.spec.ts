import { Filter, Search } from '@ativoscapital/jedi.node.core'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice, InvoiceContracts } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { SearchInvoice } from '../SearchInvoice.Query'

describe('Search Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  const factory = structure.getRandomFactory('invoice')

  const email = 'testing@mail.com'

  let entities: Invoice[]

  const handler = new SearchInvoice.Handler({
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

  it('should execute the search handler', async () => {
    const spySearch = vitest.spyOn(invoiceRepository, 'search')

    const handlerResult = await handler.execute(
      new SearchInvoice.Query({
        params: {}
      })
    )

    expect(
      handlerResult.items.length,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    const handlerResultWithEmail = await handler.execute(
      new SearchInvoice.Query({
        params: {},
        email
      })
    )

    expect(
      handlerResultWithEmail.items.length,
      'Some entities did not returned as expected'
    ).toStrictEqual(entities.length)

    expect(
      spySearch,
      'The repository did not call the `search` method'
    ).toHaveBeenCalledTimes(2)

    for (const entity of handlerResult.items) {
      const randomEntity = entities.find(
        (item) => item.id.toString() === entity.id.toString()
      )

      if (!randomEntity) {
        throw new Error(`Entity of id ${entity.id} not found`)
      }

      expect(randomEntity.toJSON()).toStrictEqual(entity)
    }
  })

  it('should run the method search using filters', async () => {
    const entities = factory.createMultiple(10)

    const entityToWorkWith1 = entities[0]
    const entityToWorkWith2 = entities[1]

    await invoiceRepository.insertMany(entities)

    const filter: InvoiceContracts.SearchParams['filter'] = [
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith1.id.toString()
      }
    ]

    const params = new InvoiceContracts.SearchParams({
      page: 1,
      limit: 2,
      sort: 'auditInfo.created.at',
      sortDirection: Search.SortDirection.Ascending,
      filter: filter
    })

    const result = await invoiceRepository.search(params)

    expect(entityToWorkWith1.toJSON()).toStrictEqual(result.items[0].toJSON())

    const filter2: InvoiceContracts.SearchParams['filter'] = [
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith2.id.toString()
      }
    ]

    const params2 = new InvoiceContracts.SearchParams({
      page: 1,
      limit: 2,
      sort: 'auditInfo.created.at',
      sortDirection: Search.SortDirection.Ascending,
      filter: filter2
    })

    const result2 = await invoiceRepository.search(params2)

    expect(entityToWorkWith2.toJSON()).toStrictEqual(result2.items[0].toJSON())

    const filter3: InvoiceContracts.SearchParams['filter'] = [
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith1.id.toString()
      },
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith2.id.toString()
      }
    ]

    const params3 = new InvoiceContracts.SearchParams({
      page: 1,
      limit: 2,
      sort: 'auditInfo.created.at',
      filter: filter3
    })

    const result3 = await invoiceRepository.search(params3)

    expect(result3.items.length).toStrictEqual(2)

    for (const item of result3.items) {
      expect(
        [
          entityToWorkWith1.id.toString(),
          entityToWorkWith2.id.toString()
        ].includes(item.id.toString())
      ).toStrictEqual(true)
    }
  })

  it(`should run the method search with multiple
  filters with same columns for more then one item, and multiple
  search for different columns`, async () => {
    const entities = factory.createMultiple(10)

    await invoiceRepository.insertMany(entities)

    const entityToWorkWith1 = entities[0]
    const entityToWorkWith2 = entities[1]

    const filter: InvoiceContracts.SearchParams['filter'] = [
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith1.id.toString()
      },
      {
        column: 'id',
        operator: Filter.Operators.Equal,
        type: Filter.Types.Operator,
        value: entityToWorkWith2.id.toString()
      }
    ]

    const params = new InvoiceContracts.SearchParams({
      page: 1,
      limit: 2,
      sort: 'auditInfo.created.at',
      filter: filter
    })

    const result = await invoiceRepository.search(params)

    expect(result.items.length).toStrictEqual(2)

    for (const item of result.items) {
      expect(
        [
          entityToWorkWith1.id.toString(),
          entityToWorkWith2.id.toString()
        ].includes(item.id.toString())
      ).toStrictEqual(true)
    }
  })
  it('should run the method search using default filter', async () => {
    const entities = factory.createMultiple(10)

    await invoiceRepository.insertMany(entities)

    const entityToWorkWith1 = entities[0]

    const params = new InvoiceContracts.SearchParams({
      page: 1,
      limit: 2,
      sort: 'auditInfo.created.at',
      defaultFilter: [
        {
          column: 'id',
          operator: Filter.Operators.Equal,
          type: Filter.Types.Operator,
          value: entityToWorkWith1.id.toString()
        }
      ]
    })

    const result = await invoiceRepository.search(params)

    expect(result.items[0].toJSON()).toStrictEqual(entityToWorkWith1.toJSON())
  })
})
