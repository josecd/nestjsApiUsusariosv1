/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepositorio:Repository<User>){
        
    }

    createUser(user:createUserDto){
        const newUser = this.userRepositorio.create(user)
        return this.userRepositorio.save(newUser)
    }

    listarUsuario(){
        return this.userRepositorio.find();
    }
    
    listarUsuarioPorID(id: number){
        return this.userRepositorio.findOne({
            where:{
                id:id
            }
        })
    }

    eliminarUsuario(id: number){
        return this.userRepositorio.delete({id})
    }

    updateUsusario(id:number, user:updateUserDto){
        return this.userRepositorio.update({id},user)
    }
}
