/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) /*Para saber que entidad vamos a usar o que tablas  usaremos*/
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
