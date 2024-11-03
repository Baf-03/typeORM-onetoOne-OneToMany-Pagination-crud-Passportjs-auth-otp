import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { Posts } from './entities/posts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Profile,Posts])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
