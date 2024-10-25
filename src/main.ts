import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication
} from '@nestjs/platform-fastify'
import { Environment } from './Shared'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    {
      cors: true
    }
  )

  const logger = new Logger()

  const env = app.get(Environment)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      exceptionFactory(errors) {
        return errors
      }
    })
  )

  const PORT = env.HTTP_PORT

  await app.listen(PORT, () => {
    logger.debug(`Server running on port ${PORT}`)
  })
}
bootstrap()
