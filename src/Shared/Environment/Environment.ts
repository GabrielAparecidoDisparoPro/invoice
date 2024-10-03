import { BaseEnvironment } from '@ativoscapital/jedi.node.nestjs'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

enum MongoDBReadPreference {
  PRIMARY = 'primary',
  PRIMARY_PREFERRED = 'primaryPreferred',
  SECONDARY = 'secondary',
  SECONDARY_PREFERRED = 'secondaryPreferred',
  NEAREST = 'nearest'
}

export class Environment extends BaseEnvironment {
  // Mongo DB

  @IsString()
  @IsNotEmpty()
  MONGODB_URI!: string

  @IsString()
  @IsNotEmpty()
  MONGODB_NAME!: string

  @IsEnum(MongoDBReadPreference)
  @IsNotEmpty()
  MONGODB_READ_PREFERENCE!: MongoDBReadPreference

  // Api
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  HTTP_PORT!: number

  @IsString()
  @IsNotEmpty()
  JWT_SECRET_KEY!: string

  @IsString()
  @IsNotEmpty()
  INTERNAL_TOKEN!: string
}
