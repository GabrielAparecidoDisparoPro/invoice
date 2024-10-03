import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { InsertInvoice } from '../InsertInvoice.Command'

describe('Insert Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new InsertInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')
  })

  it('should execute the insert handler', async () => {
    const spyInsert = vitest.spyOn(invoiceRepository, 'insert')

    const handlerResult = await handler.execute(
      new InsertInvoice.Command({
        data: {
          ...randomInvoice.toJSON()
        }
      })
    )

    expect(
      spyInsert,
      'The repository did not call the `insert` method'
    ).toHaveBeenCalledTimes(1)

    const { state, auditInfo, id, ...resultRest } = handlerResult

    expect(id).not.toStrictEqual(randomInvoice.id.toString())

    const {
      state: randomState,
      auditInfo: randomAuditInfo,
      id: randomId,
      ...randomRest
    } = randomInvoice.toJSON()

    expect(
      resultRest,
      'The handler did not resulted with the expected entity'
    ).toStrictEqual(randomRest)

    const foundInvoice = await invoiceRepository.findById(id)

    expect(foundInvoice.toJSON()).toStrictEqual(handlerResult)
  })
})
