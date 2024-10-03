import type { Provider } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import type { Connection } from 'mongoose'
import {
  ActivateInvoice,
  CountInvoice,
  DeactivateInvoice,
  DeleteInvoice,
  FindAllInvoice,
  FindByFieldInvoice,
  FindByIdInvoice,
  InsertInvoice,
  InsertManyInvoices,
  type InvoiceContracts,
  InvoiceMongoose,
  ReplaceInvoice,
  SearchInvoice,
  SearchWithoutPaginationInvoice,
  SoftDeleteInvoice,
  UpdateInvoice,
  UpdateManyInvoices
} from '../../../Core'

export namespace InvoiceMongooseInjection {
  export const Repositories = {
    invoice: {
      provide: InvoiceMongoose.Repository,
      useFactory: (connection: Connection) => {
        return new InvoiceMongoose.Repository(connection)
      },
      inject: [getConnectionToken()]
    }
  } satisfies Record<string, Provider>

  export const Queries: Record<string, Provider> = {
    findByIdInvoice: {
      provide: FindByIdInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new FindByIdInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    findByFieldInvoice: {
      provide: FindByFieldInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new FindByFieldInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    findAllInvoice: {
      provide: FindAllInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new FindAllInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    countInvoice: {
      provide: CountInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new CountInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    searchInvoice: {
      provide: SearchInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new SearchInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    searchWithoutPaginationInvoice: {
      provide: SearchWithoutPaginationInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new SearchWithoutPaginationInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    }
  }

  export const Commands: Record<string, Provider> = {
    insertInvoice: {
      provide: InsertInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new InsertInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    InsertManyInvoices: {
      provide: InsertManyInvoices.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new InsertManyInvoices.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    activateInvoice: {
      provide: ActivateInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new ActivateInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    deactivateInvoice: {
      provide: DeactivateInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new DeactivateInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    updateInvoice: {
      provide: UpdateInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new UpdateInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    replaceInvoice: {
      provide: ReplaceInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new ReplaceInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    UpdateManyInvoices: {
      provide: UpdateManyInvoices.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new UpdateManyInvoices.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    softDeleteInvoice: {
      provide: SoftDeleteInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new SoftDeleteInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    },
    deleteInvoice: {
      provide: DeleteInvoice.Handler,
      useFactory: (invoiceRepository: InvoiceContracts.Repository) => {
        return new DeleteInvoice.Handler({
          invoiceRepository
        })
      },
      inject: [Repositories.invoice.provide]
    }
  } satisfies Record<string, Provider>
}
