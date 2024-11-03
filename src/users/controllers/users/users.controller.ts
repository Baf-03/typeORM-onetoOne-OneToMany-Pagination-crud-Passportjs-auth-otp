import { Body, Controller, Delete, NotFoundException, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { authGuard } from 'src/auth/auth.guard';
import { profileDto } from 'src/users/dtos/profile.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Request as ExpressRequest } from 'express';
import { updateProfileDto } from 'src/users/dtos/updateProfile.dto';
import { Users } from 'src/users/entities/users.entity';

interface RequestWithUser extends ExpressRequest {
    user: { user: Users };
}

@UseGuards(authGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post("profile")
    @UsePipes(new ValidationPipe())
    profile(@Body() profileDto: profileDto, @Req() req: RequestWithUser) {
        const { user } = req.user;
        return this.userService.profile(profileDto,user)
    }

    @Post("/update")
    @UsePipes(new ValidationPipe())
    update(@Body() profileDto: updateProfileDto, @Req() req: RequestWithUser) {

        console.log(req.user)
        const { user } = req.user;
        console.log("email",user)

        return this.userService.updateProfile(profileDto,user)
    }

    @Delete("/:id")
    delete(
        @Param("id", ParseIntPipe) id: number
    ) {
        if (!id) {
            throw new NotFoundException("no id found")
        }
        return this.userService.delete(id)
    }
}
