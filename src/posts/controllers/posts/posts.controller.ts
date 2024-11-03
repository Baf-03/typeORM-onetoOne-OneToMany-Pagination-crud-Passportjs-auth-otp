import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { postDto } from 'src/posts/dtos/post.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { Users } from 'src/users/entities/users.entity';
import { Request as ExpressRequest } from 'express';
import { authGuard } from 'src/auth/auth.guard';
import { updatePostDto } from 'src/posts/dtos/updatePost.dto';
import { PaginationDto } from 'src/posts/dtos/Pagination.dto';

interface RequestWithUser extends ExpressRequest {
    user: { user: Users };
}

@UseGuards(authGuard)
@Controller('posts')
export class PostsController {

    constructor(private readonly postService:PostsService){}


    @Post("new")
    createPost(
        @Body() postDto:postDto,
        @Req() req: RequestWithUser
    ){
        const {user} =req.user
        console.log(user)
        return this.postService.createPost(postDto,user)
    }

    @Put("/update/post")
    updatePost(
        @Body() postDto:updatePostDto,
        @Req() req: RequestWithUser
    ){
        const {user} =req.user
        console.log(user)
        return this.postService.updatePost(postDto,user)
    }

    @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.postService.findAllPost(paginationDto);
  }



}
