import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

import * as bcrypt from "bcrypt";
import { profileDto } from 'src/users/dtos/profile.dto';
import { Profile } from 'src/users/entities/profile.entity';
import { updateProfileDto } from 'src/users/dtos/updateProfile.dto';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private userRepos: Repository<Users>,
        @InjectRepository(Profile) private profileRepos: Repository<Profile>) { }

    async create(userdto: createUserDto) {
        const { email, password } = userdto;

        const userExist = await this.userRepos.findOne({
            where: {
                email
            }
        })

        if (userExist) {
            throw new ConflictException("email already in use!")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const objToSave = {
            email,
            password: hashedPassword
        }

        return await this.userRepos.save(objToSave);

    }

    async profile(profileDto: profileDto, userDto: Users) {

        const { bio, name } = profileDto

        const ProfileExist = await this.profileRepos.findOne({
            where: {
                user: userDto
            }
        })

        if (ProfileExist) {
            throw new ConflictException("profile already created!")
        }

        return await this.profileRepos.save({
            bio,
            name,
            user: userDto
        })

    }

    async updateProfile(profileDto: updateProfileDto, userdto: Users) {
        const profileExist = await this.profileRepos.findOne({
            where:{
                user:userdto
            }
        })

        if(!profileExist){
            throw new NotFoundException("No profile found! create profile first to access this feature")
        }

        await this.profileRepos.update(profileExist.id, { ...profileDto });
    }

    async delete(id: number) {
        const user = await this.userRepos.findOne({
            where: { id },
            relations: ['profile'],
        });
        console.log(user);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.profileRepos.remove(user.profile);
        await this.userRepos.remove(user);
        return "xd"
    }

}