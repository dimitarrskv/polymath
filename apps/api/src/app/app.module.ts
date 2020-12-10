import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { InstagramModule } from './instagram/instagram.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'test', 'prod')
          .default('dev'),
        PORT: Joi.number().default(3000),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + "/../dist/**/*.entity{.ts,.js}"],
      logging: ['query', 'error'],
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    InstagramModule
  ],
  controllers: [AppController]
})
export class AppModule {}
