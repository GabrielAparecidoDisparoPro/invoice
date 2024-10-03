import { type IJwtPayload, JwtPayload } from '@ativoscapital/jedi.node.nestjs'
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core'
import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ActivateInvoice,
  CountInvoice,
  DeactivateInvoice,
  FindAllInvoice,
  FindByFieldInvoice,
  FindByIdInvoice,
  InsertInvoice,
  InsertManyInvoices,
  ReplaceInvoice,
  SearchInvoice,
  SearchWithoutPaginationInvoice,
  SoftDeleteInvoice,
  UpdateInvoice,
  UpdateManyInvoices
} from '../../../Core'

@Controller('/invoices')
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  // Queries

  /**
   * Find invoice by a specific field and value.
   */
  @TypedRoute.Get('/by-field')
  async byField(
    @TypedQuery() data: FindByFieldInvoice.Input,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<FindByFieldInvoice.Output> {
    return this.queryBus.execute(
      new FindByFieldInvoice.Query({
        field: data.field,
        value: data.value,
        email
      })
    )
  }

  /**
   * Find invoice by its unique identifier (Id).
   */
  @TypedRoute.Get('/:id')
  async byId(
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<FindByIdInvoice.Output> {
    return this.queryBus.execute(
      new FindByIdInvoice.Query({
        id,
        email
      })
    )
  }

  /**
   * Find all invoice available.
   */
  @TypedRoute.Get('/')
  async findAll(
    @JwtPayload() { email }: IJwtPayload
  ): Promise<FindAllInvoice.Output> {
    return this.queryBus.execute(
      new FindAllInvoice.Query({
        email
      })
    )
  }

  /**
   * List the invoice paginated, according with the determined
   * search params applied.
   */
  @TypedRoute.Post('/search')
  async paginated(
    @TypedBody() body: Omit<SearchInvoice.Input, 'email'>,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<SearchInvoice.Output> {
    return this.queryBus.execute(
      new SearchInvoice.Query({
        params: body.params,
        email
      })
    )
  }

  /**
   * List the invoice without pagination, according with the
   * determined search params applied.
   */
  @TypedRoute.Post('/search-without-pagination')
  async pagination(
    @TypedBody() body: Omit<SearchWithoutPaginationInvoice.Input, 'email'>,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<SearchWithoutPaginationInvoice.Output> {
    return this.queryBus.execute(
      new SearchWithoutPaginationInvoice.Query({
        params: body.params,
        email
      })
    )
  }

  /**
   * Count the invoice according with the
   * determined search params applied.
   */
  @TypedRoute.Post('/count')
  async withSearch(
    @TypedBody() body: Omit<CountInvoice.Input, 'email'>,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<CountInvoice.Output> {
    return this.queryBus.execute(
      new CountInvoice.Query({
        params: body.params,
        email
      })
    )
  }

  // Commands

  /**
   * Inserts a new invoice.
   */
  @TypedRoute.Post('/')
  async insertOne(
    @TypedBody() body: InsertInvoice.Input['data'],
    @JwtPayload() { email }: IJwtPayload
  ): Promise<InsertInvoice.Output> {
    return this.commandBus.execute(
      new InsertInvoice.Command({
        data: body,
        email
      })
    )
  }

  /**
   * Inserts many new invoice in bulk.
   */
  @TypedRoute.Post('/bulk')
  async insertMany(
    @TypedBody() body: InsertManyInvoices.Input['data'],
    @JwtPayload() { email }: IJwtPayload
  ): Promise<InsertManyInvoices.Output> {
    return this.commandBus.execute(
      new InsertManyInvoices.Command({
        data: body,
        email
      })
    )
  }

  /**
   * Updates partially one invoice.
   */
  @TypedRoute.Patch('/:id')
  async updateOne(
    @TypedBody() data: UpdateInvoice.Input['data'],
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<UpdateInvoice.Output> {
    return this.commandBus.execute(
      new UpdateInvoice.Command({
        data,
        id,
        email
      })
    )
  }

  /**
   * Updates partially many invoice in bulk.
   */
  @TypedRoute.Patch('/bulk')
  async updateMany(
    @TypedBody() body: Omit<UpdateManyInvoices.Input, 'email'>,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<UpdateManyInvoices.Output> {
    return this.commandBus.execute(
      new UpdateManyInvoices.Command({
        data: body.data,
        ids: body.ids,
        email
      })
    )
  }

  /**
   * Activates one invoice, setting it state to Active.
   */
  @TypedRoute.Patch('/:id/activate')
  async activate(
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<ActivateInvoice.Output> {
    return this.commandBus.execute(
      new ActivateInvoice.Command({
        id,
        email
      })
    )
  }

  /**
   * Deactivates one invoice, setting it state to Inactive.
   */
  @TypedRoute.Patch('/:id/deactivate')
  async deactivate(
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<DeactivateInvoice.Output> {
    return this.commandBus.execute(
      new DeactivateInvoice.Command({
        id,
        email
      })
    )
  }

  /**
   * Replaces one invoice entirely for another.
   */
  @TypedRoute.Put('/:id')
  async replaceOne(
    @TypedBody() data: ReplaceInvoice.Input['data'],
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<ReplaceInvoice.Output> {
    return this.commandBus.execute(
      new ReplaceInvoice.Command({
        data,
        id,
        email
      })
    )
  }

  /**
   * Permanently deletes one invoice.
   */

  // @TypedRoute.Delete('/:id/definitive')
  // async hardDelete(
  //   @TypedParam('id') id: string,
  //   @JwtPayload() { email }: IJwtPayload
  // ): Promise<DeleteInvoice.Output> {
  //   return this.commandBus.execute(
  //     new DeleteInvoice.Command({ id, email })
  //   )
  // }

  /**
   * Soft deletes one invoice, setting it state to Deleted.
   */
  @TypedRoute.Delete('/:id')
  async softDelete(
    @TypedParam('id') id: string,
    @JwtPayload() { email }: IJwtPayload
  ): Promise<SoftDeleteInvoice.Output> {
    return this.commandBus.execute(new SoftDeleteInvoice.Command({ id, email }))
  }
}
