import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SharedModule } from './Shared'
import { Environment } from './Shared'

@Module({
  imports: [
    SharedModule,

    MongooseModule.forRootAsync({
      useFactory: async (env: Environment) => ({
        uri: env.MONGODB_URI,
        dbName: env.MONGODB_NAME,
        readPreference: env.MONGODB_READ_PREFERENCE
      }),
      inject: [Environment]
    })
  ],
  providers: []
})
export class AppModule {}
