import { Filter, Search } from '@ativoscapital/jedi.node.core'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { UpdateManyInvoices } from '../UpdateManyInvoices.Command'

describe('UpdateMany Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const email = 'testing@mail.com'

  const invoiceRepository = structure.getRepository('invoice')

  let entities: Invoice[]

  const factory = structure.getRandomFactory('invoice')

  const handler = new UpdateManyInvoices.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    entities = structure.getEntityStructure('invoice')._10RandomEntities

    await invoiceRepository.insertMany(entities)
  })

  it('should execute the UpdateMany handler', async () => {
    const spyUpdateMany = vitest.spyOn(invoiceRepository, 'updateMany')

    const ids = entities.map((entity) => entity.id.toString())

    const oldEntities = await invoiceRepository.search(
      new Search.Params({
        defaultFilter: ids.map((id) => ({
          column: 'id',
          operator: Filter.Operators.Equal,
          type: Filter.Types.Operator,
          value: id
        }))
      })
    )

    const {
      id: _,
      auditInfo: randomAuditInfo,
      ...newData
    } = factory.createOne().toJSON()

    const handlerResult = await handler.execute(
      new UpdateManyInvoices.Command({
        ids,
        email,
        data: newData
      })
    )

    expect(
      spyUpdateMany,
      'The repository `updateMany` method was not called'
    ).toHaveBeenCalledTimes(1)
    expect(
      handlerResult,
      'The handler did not resulted with undefined'
    ).toBeUndefined()

    const newEntities = await invoiceRepository.search(
      new Search.Params({
        defaultFilter: ids.map((id) => ({
          column: 'id',
          operator: Filter.Operators.Equal,
          type: Filter.Types.Operator,
          value: id
        }))
      })
    )

    for (const entity of oldEntities.items) {
      const entityAfterUpdate = newEntities.items.find(
        (newEntity) => newEntity.id.toString() === entity.id.toString()
      )

      expect(
        entityAfterUpdate,
        'Something went wrong and entity was not able to be found after updateMany was called'
      ).toBeDefined()

      if (!entityAfterUpdate) {
        throw new Error()
      }

      const { auditInfo, ...afterUpdate } = entityAfterUpdate.toJSON()
      const old = entity.toJSON()

      expect(
        afterUpdate,
        'Entities stills the same, so the update did not happen'
      ).not.toStrictEqual(old)

      const expected = { ...newData, id: old.id }

      expect(
        expected,
        `The data was not updated correctly for entity ${old.id}`
      ).toStrictEqual(afterUpdate)
      expect(auditInfo.updated?.at, 'updated.at was not changed').toBeDefined()
      expect(auditInfo.updated?.email, 'email was not changed').toStrictEqual(
        email
      )
    }
  })
})
