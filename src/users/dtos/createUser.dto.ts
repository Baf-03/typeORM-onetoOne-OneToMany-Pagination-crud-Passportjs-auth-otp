import {IsEmail, IsNotEmpty, IsString} from "class-validator"
import { Profile } from "../entities/profile.entity";


export class createUserDto{

   
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

}