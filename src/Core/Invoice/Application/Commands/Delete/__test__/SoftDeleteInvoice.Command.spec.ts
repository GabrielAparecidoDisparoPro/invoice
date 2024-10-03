import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { SoftDeleteInvoice } from '../SoftDeleteInvoice.Command'

describe('SoftDelete Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new SoftDeleteInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the Softdelete handler', async () => {
    const spySoftDelete = vitest.spyOn(invoiceRepository, 'softDelete')

    const handlerResult = await handler.execute(
      new SoftDeleteInvoice.Command({
        id: randomInvoice.id.toString()
      })
    )

    expect(
      spySoftDelete,
      'The repository did not call the `softDelete` method'
    ).toHaveBeenCalledTimes(1)

    expect(
      handlerResult,
      'The handler did not resulted with undefined'
    ).toBeUndefined()

    const foundInvoiceAfterSoftDelete = await invoiceRepository.findById(
      randomInvoice.id
    )

    expect(foundInvoiceAfterSoftDelete.state).toStrictEqual(
      Invoice.States.Deleted
    )

    randomInvoice.softDelete()

    const jsonRandom = randomInvoice.toJSON()

    const jsonFound = foundInvoiceAfterSoftDelete.toJSON()

    jsonRandom.auditInfo.deleted = jsonFound.auditInfo.deleted

    expect(
      jsonRandom,
      'Something went wrong, found data did not match with previous'
    ).toStrictEqual(jsonFound)
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new SoftDeleteInvoice.Command({
          id: 'fake'
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
