import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class updateProfileDto{

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    name?: string;

    // @IsNotEmpty()
    // @IsNumber()
    // @IsPositive()
    // userId:number
    
}