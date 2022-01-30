import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
        return this.authService.createUser(createUserDto);
    }
}
