import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Profile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})

export class UsersModule {}