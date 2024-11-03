import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        private readonly userService:UsersService,
        @InjectRepository(Users) private userRepos:Repository<Users>,
        private jwt:JwtService
    ){}

    register(registerDto:createUserDto){
        return this.userService.create(registerDto)
    }


    async login(loginDto:{
        email:string,
        password:string
    }){
        const {email,password}=loginDto
        const userExist = await this.userRepos.findOne({
            where:{
                email:email
            }
        })
        if(!userExist){
            throw new NotFoundException("email Not found")
        }

        const comp_pass = await bcrypt.compare(password,userExist.password)

        if(!comp_pass){
            throw new ForbiddenException("invalid password");
        }
        const payload={email}
        const token = this.jwt.sign(payload);

        return {
            user:userExist,
            token
        }
    }

    async verify(email:string){
        const userExist = await this.userRepos.findOne({
            where:{
                email
            }
        })
        if(!userExist){
            throw new ForbiddenException("invalid token")
        }
        return {user:userExist}
    }


}
