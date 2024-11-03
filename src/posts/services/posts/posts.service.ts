import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/posts/dtos/Pagination.dto';
import { postDto } from 'src/posts/dtos/post.dto';
import { updatePostDto } from 'src/posts/dtos/updatePost.dto';
import { Posts } from 'src/posts/entities/posts.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Posts) private postsRepos:Repository<Posts>,
    @InjectRepository(Profile) private profileRepo:Repository<Profile>){}


    async createPost(postDto:postDto,userDto:Users){

        const ProfileExist = await this.profileRepo.findOne({
            where: {
                user: userDto
            }
        })

        const {content} = postDto;

        const objToSave={
            content,
            Profile:ProfileExist
        }

        const newPost = await this.postsRepos.save(objToSave)
        return newPost
    }


    async updatePost(postDto: updatePostDto, userDto: Users) {
        const { content, id } = postDto;
    
        const result = await this.postsRepos
            .createQueryBuilder("posts")
            .innerJoinAndSelect("posts.Profile","profile")
            .where("profile.userId = :userId",{userId:userDto.id})
            .andWhere("posts.id = :id",{id})
            .getOne()  
            

        if (!result) {
            throw new NotFoundException("No post found for this user and ID!");
        }
    
        result.content = content;
        return await this.postsRepos.save(result);
    }

    
   
  async findAllPost(paginationDto: PaginationDto) {
    // Ensure page and limit are numbers and set defaults if needed
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const skip = (page - 1) * limit;

    const [results, total] = await this.postsRepos.findAndCount({
      skip,
      take: limit,
    });

    return {
      data: results,
      count: results.length,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    };
  }


}
