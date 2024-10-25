import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { InvoiceModule } from './Modules'
import { SharedModule } from './Shared'
import { Environment } from './Shared'

@Module({
  imports: [
    SharedModule,
    InvoiceModule,
    MongooseModule.forRootAsync({
      useFactory: async (env: Environment) => ({
        uri: env.MONGODB_URI,
        dbName: env.MONGODB_NAME,
        readPreference: env.MONGODB_READ_PREFERENCE
      }),
      inject: [Environment]
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379
      }
    }),
    ScheduleModule.forRoot()
  ],
  providers: [],
  exports: [BullModule]
})
export class AppModule {}
