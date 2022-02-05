import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CommonErrors } from 'src/shared/errors/common-erros';
import { AuthRegisterDto } from './models/dto/auth-register.dto';
import { AuthLoginDto } from './models/dto/auth-login.dto';
import { User } from './models/entities/user.entity';
import { ForgotPasswordDto } from './models/dto/forgot-password.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,  private jwtService: JwtService, private mailerService: MailerService) { }

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
            role: user.role,
            userId: user.id,
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

    async findbyId(id: number) {
        return await User.findOne({
            where: {
                id: id,
            },
        });
    }

    async getLoggedUser(user: any) {
        const loggedUser =  await this.userRepository.findOne({
            where: {
                id: user,
            },
        });
        
        delete loggedUser.password;
        return loggedUser;
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {

        const exists = await this.findByEmail(forgotPasswordDto.email);
    
        if(!exists) {
            throw new NotFoundException(CommonErrors.NotFound);
        } else {

            const user = await this.userRepository.findOne({
                email: forgotPasswordDto.email,
            });

            const passwordRand = Math.random()
                .toString(36)
                .slice(-8);

            user.password = bcrypt.hashSync(passwordRand, 8);

            this.sendForgotPasswordMail(user.email, passwordRand);
            return await this.userRepository.save(user);
        }
    }

    private async sendForgotPasswordMail(email, password) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: '/forgot-password', 
            context: { 
                email: email,
                password: password
            },
        });
    }

}
