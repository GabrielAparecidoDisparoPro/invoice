import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { DeactivateInvoice } from '../DeactivateInvoice.Command'

describe('Deactivate Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new DeactivateInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the deactivate handler', async () => {
    const spyDeactivate = vitest.spyOn(invoiceRepository, 'deactivate')

    const oldInvoice = await invoiceRepository.findById(randomInvoice.id)

    const handlerResult = await handler.execute(
      new DeactivateInvoice.Command({
        id: randomInvoice.id.toString()
      })
    )

    expect(
      spyDeactivate,
      'The repository did not call the `deactivate` method'
    ).toHaveBeenCalledTimes(1)

    const { state: resultState, ...resultRest } = handlerResult

    const { state: randomState, ...randomRest } = oldInvoice.toJSON()

    expect(
      resultRest,
      'The handler did not resulted with the expected entity'
    ).toStrictEqual(randomRest)
    expect(
      randomState,
      'The entity used as input did not started with the state Inactive'
    ).toStrictEqual(Invoice.States.Active)
    expect(
      resultState,
      'The entity state after deactivation was not marked as Inactive'
    ).toStrictEqual(Invoice.States.Inactive)

    const invoiceAfterDeactivation = await invoiceRepository.findById(
      randomInvoice.id
    )

    expect(
      invoiceAfterDeactivation.state,
      'The entity after being retrieved by a search method, resulted with state not Inactive'
    ).toStrictEqual(Invoice.States.Inactive)
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new DeactivateInvoice.Command({
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
