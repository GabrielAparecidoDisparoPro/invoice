import {
  AuthenticationModule,
  EnvironmentModule
} from '@ativoscapital/jedi.node.nestjs'
import { Global, Module } from '@nestjs/common'
import { Environment } from './Environment'

@Global()
@Module({
  imports: [
    EnvironmentModule.forRoot({
      environmentClass: Environment
    }),

    AuthenticationModule.forRootAsync({
      useFactory: (env: Environment) => {
        return {
          secretKey: env.JWT_SECRET_KEY,
          internalToken: env.INTERNAL_TOKEN
        }
      },
      inject: [Environment]
    })
  ],
  controllers: [],
  providers: []
})
export class SharedModule {}
