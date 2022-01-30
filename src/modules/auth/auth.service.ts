import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonErrors } from 'src/shared/errors/common-erros';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(createuserDto: CreateUserDto) {

        const existing = await this.userRepository.findOne({ 
            where: { 
                email: createuserDto.email 
            } 
        });
        const user = await this.userRepository.create(createuserDto);

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
}
