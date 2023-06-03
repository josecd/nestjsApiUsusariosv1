/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    { 
    type: 'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'usuariosapi',
    entities:[__dirname + '/**/*.entity{.ts,.js}'], /* Sirve para buscar las tablas de la base de datos en todas las carpetas */
    synchronize:true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
