import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'email', description: 'unique email'})
    @IsString({message: 'must be a string'})
    @IsEmail({},{message: 'email incorrect'})
    readonly email: string

    @ApiProperty({example: 'password', description: 'password'})
    @IsString({message: 'must be a string'})
    @Length(4, 10, {message: 'from 4 to 10 '})
    readonly password: string
}