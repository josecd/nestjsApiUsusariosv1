/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */  
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './post.entity';
import { createPostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private _post:PostsService){

    }

    @Get()
    listarUsuarios(): Promise<Posts[]>{
        return this._post.getPost();
    }

    @Post()
    createUser(@Body() post: createPostDto){
        return this._post.createPost(post);
    }

}
