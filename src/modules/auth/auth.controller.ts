import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { AuthLoginDto } from './models/dto/auth-login.dto';
import { AuthService } from './auth.service';
import { User } from './models/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
        return this.authService.createUser(createUserDto);
    }

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto) {
        return this.authService.login(authLoginDto);
    }
}
