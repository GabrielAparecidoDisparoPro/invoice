// import type { FastifyReply, FastifyRequest } from 'fastify'

import { NodeEnvironments } from '@ativoscapital/jedi.node.nestjs'
import { type ArgumentsHost, Catch, HttpException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Environment } from '../Environment'

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly env: Environment) {
    super()
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    // const ctx = host.switchToHttp()
    // const response = ctx.getResponse<FastifyReply>()
    // const request = ctx.getRequest<FastifyRequest>()

    const formattedException = new HttpException(
      {
        message: exception?.message,
        statusCode: exception.getStatus(),
        cause: exception?.cause,
        name: exception?.name,
        ...(this.env.NODE_ENV === NodeEnvironments.Development
          ? {
              stack: exception.stack
            }
          : {})
      },
      exception.getStatus()
    )

    return super.catch(formattedException, host)
  }
}
