import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { CommonErrors } from 'src/shared/errors/common-erros';
import { AuthRegisterDto } from './models/dto/auth-register.dto';
import { AuthLoginDto } from './models/dto/auth-login.dto';
import { User } from './models/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,  private jwtService: JwtService) { }

    async register(authRegisterDto: AuthRegisterDto) {

        const existing = await this.findByEmail(authRegisterDto.email);

        const user = await this.userRepository.create(authRegisterDto);

        if (existing) { 
            throw new InternalServerErrorException(CommonErrors.EmailExist);
        }
        else {
            try {
                await user.save();
            } catch (err) {
                throw new InternalServerErrorException(CommonErrors.ServerError);
            }
        }
        
        delete user.password;
        return user;
    }

    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            id: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;

        const user = await this.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException(CommonErrors.Unauthorized);
        }

        return user;
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

}
