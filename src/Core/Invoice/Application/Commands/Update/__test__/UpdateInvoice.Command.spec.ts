import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { UpdateInvoice } from '../UpdateInvoice.Command'

describe('Update Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const email = 'testing@mail.com'

  const invoiceRepository = structure.getRepository('invoice')

  const factory = structure.getRandomFactory('invoice')

  let randomInvoice: Invoice

  const handler = new UpdateInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the update handler', async () => {
    const spyUpdate = vitest.spyOn(invoiceRepository, 'update')

    const oldInvoice = await invoiceRepository.findById(randomInvoice.id)

    const { id: _, auditInfo, ...newData } = factory.createOne().toJSON()

    const {
      id: handlerResultId,
      auditInfo: handlerResultAuditInfo,
      ...handlerResult
    } = await handler.execute(
      new UpdateInvoice.Command({
        id: randomInvoice.id.toString(),
        email,
        data: newData
      })
    )

    expect(
      spyUpdate,
      'The repository `update` method was not called'
    ).toHaveBeenCalledTimes(1)
    expect(
      handlerResult,
      'The handler did not resulted with the updated data correctly'
    ).toStrictEqual(newData)

    const {
      id: oldId,
      auditInfo: oldAuditInfo,
      ...oldData
    } = oldInvoice.toJSON()

    const invoiceAfterUpdate = await invoiceRepository.findById(
      randomInvoice.id
    )

    const {
      id: afterUpdateId,
      auditInfo: afterUpdateAuditInfo,
      ...afterUpdateData
    } = invoiceAfterUpdate.toJSON()

    expect(
      oldData,
      'The update did not happen, the data stills the same'
    ).not.toStrictEqual(afterUpdateData)
    expect(
      oldId,
      'Something went wrong, after the update the id changed'
    ).toStrictEqual(afterUpdateId)
    expect(
      newData,
      'Something went wrong, the inserted new data is not the expected'
    ).toStrictEqual(afterUpdateData)

    expect(
      afterUpdateAuditInfo.updated?.at,
      'updated.at was not changed'
    ).toBeDefined()
    expect(
      afterUpdateAuditInfo.updated?.email,
      'email was not changed'
    ).toStrictEqual(email)
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new UpdateInvoice.Command({
          id: 'fake',
          data: {}
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
