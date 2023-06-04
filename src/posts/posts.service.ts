/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { createPostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts) private postsRepositorio:Repository<Posts>,
        private _users: UsersService,
        ){
        
    }

    //title, content, authorid
    async createPost(post:createPostDto){
        console.log(post.authorId);
        
        const userFound =  await this._users.listarUsuarioPorID(post.authorId)
        console.log(userFound);
        
        if (!userFound) {
            return new HttpException('Usuario no entrotrado',HttpStatus.NOT_FOUND)
        }
            const newPost =this.postsRepositorio.create(post)
            return this.postsRepositorio.save(newPost)

    }

    getPost(){
        return this.postsRepositorio.find({
            relations:['author']
        });
    }


}
