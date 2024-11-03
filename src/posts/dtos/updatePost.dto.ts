import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class updatePostDto{

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id:number;
}