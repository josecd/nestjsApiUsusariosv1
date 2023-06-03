/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Controller, Post ,Body, Get, Param ,ParseIntPipe, Delete, Patch} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private _user:UsersService){

    }

    @Get()
    listarUsuarios(): Promise<User[]>{
        return this._user.listarUsuario();
    }

    @Get(':id')
    listarUsuario(@Param('id',ParseIntPipe) id:number): Promise<User>{   
        return this._user.listarUsuarioPorID(id);
    }
    
    @Post()
    createUser(@Body() newUser: createUserDto):Promise<User>{
        return this._user.createUser(newUser);
    }

    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this._user.eliminarUsuario(id);
    }

    @Patch(':id')
    editarUsuario(@Param('id',ParseIntPipe) id:number, @Body()user: updateUserDto){
        return this._user.updateUsusario(id,user);
    }
}
