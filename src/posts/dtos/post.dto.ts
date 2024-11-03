import { IsNotEmpty, IsString } from "class-validator";





export class postDto{

    @IsNotEmpty()
    @IsString()
    content:string;
}