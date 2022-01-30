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

        const user = await this.userRepository.create(createuserDto);
        
        try {
            await user.save();
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(CommonErrors.Conflict);
            } else {
                throw new InternalServerErrorException(CommonErrors.ServerError);
            }
        }
        
        return user;
    }
}
