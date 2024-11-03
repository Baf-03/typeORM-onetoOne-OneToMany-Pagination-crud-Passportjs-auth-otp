import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";



export class profileDto{

    @IsNotEmpty()
    @IsString()
    bio:string;

    @IsNotEmpty()
    @IsString()
    name:string;

    // @IsNotEmpty()
    // @IsNumber()
    // @IsPositive()
    // userId:number
    
}