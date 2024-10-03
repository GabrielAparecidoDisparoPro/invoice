import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { ReplaceInvoice } from '../ReplaceInvoice.Command'

describe('Replace Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const email = 'testing@mail.com'

  const invoiceRepository = structure.getRepository('invoice')

  const factory = structure.getRandomFactory('invoice')

  let randomInvoice: Invoice

  const handler = new ReplaceInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the replace handler', async () => {
    const spyReplace = vitest.spyOn(invoiceRepository, 'replace')

    const oldInvoice = await invoiceRepository.findById(randomInvoice.id)

    const {
      id: _,
      auditInfo: randomAuditInfo,
      ...newData
    } = factory.createOne().toJSON()

    const {
      id: handlerResultId,
      auditInfo,
      ...handlerResult
    } = await handler.execute(
      new ReplaceInvoice.Command({
        id: randomInvoice.id.toString(),
        email,
        data: { auditInfo: randomAuditInfo, ...newData }
      })
    )

    const { id: oldId, ...oldData } = oldInvoice.toJSON()

    expect(
      spyReplace,
      'The repository `replace` method was not called'
    ).toHaveBeenCalledTimes(1)
    expect(
      handlerResult,
      'The handler did not resulted with the replaced data correctly'
    ).toStrictEqual(newData)

    const invoiceAfterReplace = await invoiceRepository.findById(
      randomInvoice.id
    )

    const {
      id: afterReplaceId,
      auditInfo: afterReplaceAuditInfo,
      ...afterReplaceData
    } = invoiceAfterReplace.toJSON()

    expect(
      oldData,
      'The replace did not happen, the data stills the same'
    ).not.toStrictEqual(afterReplaceData)
    expect(
      oldId,
      'Something went wrong, after the replace the id changed'
    ).toStrictEqual(afterReplaceId)
    expect(
      newData,
      'Something went wrong, the inserted new data is not the expected'
    ).toStrictEqual(afterReplaceData)
    expect(
      afterReplaceAuditInfo.updated?.at,
      'updated.at was not changed'
    ).toBeDefined()
    expect(
      afterReplaceAuditInfo.updated?.email,
      'email was not changed'
    ).toStrictEqual(email)
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new ReplaceInvoice.Command({
          id: 'fake',
          data: factory.createOne().toJSON()
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
