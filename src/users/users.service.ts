/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepositorio:Repository<User>,
        @InjectRepository(Profile) private profileRepositorio:Repository<Profile>
        
        ){
        
    }

   async createUser(user:createUserDto){
        const userFound = await this.userRepositorio.findOne({
            where:{
                username:user.username
            }
        })

        if (userFound) {
            return new HttpException('Usuario ya existe',HttpStatus.CONFLICT)
        }

        const newUser = this.userRepositorio.create(user)
        return this.userRepositorio.save(newUser)
    }

    listarUsuario(){
        return this.userRepositorio.find({
            relations:['posts','profile']
        });
    }
    
    async listarUsuarioPorID(id: number){
        const userFound  = await this.userRepositorio.findOne({
            where:{
                id:id,
            },
            relations:['posts']

        })
        if (!userFound) {
            return new HttpException('Usuario no exontrado',HttpStatus.NOT_FOUND)
        }else{
            return userFound;

        }
    }

    async eliminarUsuario(id: number){
        const result =await this.userRepositorio.delete({id});
        if (result.affected === 0) {
            return new HttpException('Usuario no exontrado',HttpStatus.NOT_FOUND)
        }else{
            return result
        }

        // const userFound = await  this.userRepositorio.findOne({
        //     where:{
        //         id:id
        //     }
        // })

        // if (!userFound) {
        //     return new HttpException('Usuario no exontrado',HttpStatus.NOT_FOUND)
        // }else{
        //     return this.userRepositorio.delete({id});
        // }

        
    }

   async updateUsusario(id:number, user:updateUserDto){
        const userFound  = await this.userRepositorio.findOne({
            where:{
                id:id
            }
        })
        if (!userFound) {
            return new HttpException('Usuario no exontrado',HttpStatus.NOT_FOUND)
        }else{
            const updateUser = Object.assign(userFound,user)
            return this.userRepositorio.save(updateUser)

        }

  
        // return this.userRepositorio.update({id},user)

    }

    async createProfile(id:number,profile:createProfileDto){
        const userFound  = await this.userRepositorio.findOne({
            where:{
                id:id
            }
        })

        if (!userFound) {
            return new HttpException('Usuario no econtrado',HttpStatus.NOT_FOUND)
        }else{
            const newProfile = this.profileRepositorio.create(profile)
            const saveProfile = await this.profileRepositorio.save(newProfile)
            userFound.profile = saveProfile;
            return this.userRepositorio.save(userFound)
        }

    }
}
