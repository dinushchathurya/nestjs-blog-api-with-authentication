import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}