import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { Invoice } from '../../../../Domain'
import { InvoiceMongooseTestingStructure } from '../../../../Infra'
import { ActivateInvoice } from '../ActivateInvoice.Command'

describe('Activate Invoice UseCase Integration Test', () => {
  const structure = new InvoiceMongooseTestingStructure()

  const invoiceRepository = structure.getRepository('invoice')

  let randomInvoice: Invoice

  const handler = new ActivateInvoice.Handler({
    invoiceRepository
  })

  beforeEach(async () => {
    structure.getRandomEntity('invoice').deactivate()

    randomInvoice = structure.getRandomEntity('invoice')

    await structure.insertAll()
  })

  it('should execute the activate handler', async () => {
    const spyActivate = vitest.spyOn(invoiceRepository, 'activate')

    const oldInvoice = await invoiceRepository.findById(randomInvoice.id)

    const handlerResult = await handler.execute(
      new ActivateInvoice.Command({
        id: randomInvoice.id.toString()
      })
    )

    expect(
      spyActivate,
      'The repository did not call the `activate` method'
    ).toHaveBeenCalledTimes(1)

    const { state: resultState, ...resultRest } = handlerResult

    const { state: randomState, ...randomRest } = oldInvoice.toJSON()

    expect(
      resultRest,
      'The handler did not resulted with the expected entity'
    ).toStrictEqual(randomRest)
    expect(
      randomState,
      'The entity used as input did not started with the state Active'
    ).toStrictEqual(Invoice.States.Inactive)
    expect(
      resultState,
      'The entity state after deactivation was not marked as Active'
    ).toStrictEqual(Invoice.States.Active)

    const invoiceAfterActivation = await invoiceRepository.findById(
      randomInvoice.id
    )

    expect(
      invoiceAfterActivation.state,
      'The entity after being retrieved by a search method, resulted with state not Active'
    ).toStrictEqual(Invoice.States.Active)
  })

  it('should throw when not found', async () => {
    expect(async () => {
      await handler.execute(
        new ActivateInvoice.Command({
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
