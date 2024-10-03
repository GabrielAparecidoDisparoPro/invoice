import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { DeleteInvoice } from '../DeleteInvoice.Command'

describe('Delete Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new DeleteInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the delete handler', async () => {
    const spyDelete = vitest.spyOn(invoiceRepository, 'delete')

    const handlerResult = await handler.execute(
      new DeleteInvoice.Command({
        id: randomInvoice.id.toString()
      })
    )

    expect(
      spyDelete,
      'The repository did not call the `delete` method'
    ).toHaveBeenCalledTimes(1)

    expect(
      handlerResult,
      'The handler did not resulted with undefined'
    ).toBeUndefined()

    expect(async () => {
      await invoiceRepository.findById(randomInvoice.id)
    }, 'It should throws an error because it will not be found').rejects.toThrow()
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new DeleteInvoice.Command({
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
