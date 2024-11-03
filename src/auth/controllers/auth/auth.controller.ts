import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { authGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}


    @Post("/register")
    register(
        @Body() userDto:createUserDto
    ){
        return this.authService.register(userDto)
    }

    @Post("/login")
    login(
        @Body() userDto:createUserDto
    ){
        return this.authService.login(userDto)
    }

    @UseGuards(authGuard)
    @Get()
    verify(){
        return "ok hae sab"
   }
}
