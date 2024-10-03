import { Filter, Search } from '@ativoscapital/jedi.node.core'
import { beforeEach, describe, expect, it } from 'vitest'
import { Invoice, InvoiceContracts } from '../../../Domain'
import { InvoiceMongoose } from '../InvoiceMongoose'
import { InvoiceMongooseTestingStructure } from '../Mocks'

describe('Mongoose Invoice repository integration tests', () => {
  const structure = new InvoiceMongooseTestingStructure()

  let invoiceRepository: InvoiceMongoose.Repository

  let randomInvoice: Invoice

  const factory = structure.getEntityStructure('invoice').randomFactory

  beforeEach(async () => {
    await structure.insertAll()

    invoiceRepository = structure.getRepository('invoice')
    randomInvoice = structure.getRandomEntity('invoice')
  })

  it('should create with the insert method and find with findById', async () => {
    const result = await invoiceRepository.findById(randomInvoice.id)

    expect(result.toJSON()).toStrictEqual(randomInvoice.toJSON())
  })

  it('should find by field', async () => {
    const result = await invoiceRepository.findByField('id', randomInvoice.id)

    expect(result.toJSON()).toStrictEqual(randomInvoice.toJSON())
  })

  it('should deactivate, activate and softDelete', async () => {
    let result = await invoiceRepository.findById(randomInvoice.id)

    await invoiceRepository.deactivate(randomInvoice.id)

    result = await invoiceRepository.findById(randomInvoice.id)

    expect(result.state).toStrictEqual(Invoice.States.Inactive)

    await invoiceRepository.activate(randomInvoice.id)

    result = await invoiceRepository.findById(randomInvoice.id)

    expect(result.state).toStrictEqual(Invoice.States.Active)

    await invoiceRepository.softDelete(randomInvoice.id)

    result = await invoiceRepository.findById(randomInvoice.id)

    expect(result.state).toStrictEqual(Invoice.States.Deleted)
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
  it('should run the method update', async () => {
    const entity = await invoiceRepository.findById(randomInvoice.id)

    await invoiceRepository.update(entity.id, entity)

    const foundAfterUpdate = await invoiceRepository.findById(entity.id)

    const jsonFound = foundAfterUpdate.toJSON()

    const entityJson = entity.toJSON()

    entityJson.auditInfo.updated = jsonFound.auditInfo.updated

    expect(entityJson).toStrictEqual(jsonFound)
  })

  it('should delete', async () => {
    await invoiceRepository.delete(randomInvoice.id)

    expect(async () => {
      await invoiceRepository.findById(randomInvoice.id)
    }).rejects.toThrow()
  })
})
