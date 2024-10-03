import { INestiaConfig } from '@nestia/sdk'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'

import { AppModule } from './src/app.module'

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule, new FastifyAdapter())

    return app
  },
  output: 'sdk/api',
  assert: false,
  simulate: false,
  json: false,
  primitive: false
}
export default NESTIA_CONFIG
