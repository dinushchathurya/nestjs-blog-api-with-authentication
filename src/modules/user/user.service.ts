import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonErrors } from 'src/shared/errors/common-erros';
import { Repository } from 'typeorm';
import { User } from '../auth/models/entities/user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,) { }
    
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number) {
        const user =  await this.userRepository.createQueryBuilder("user")
                                .leftJoinAndSelect("user.blogs", "blog")
                                .where("user.id = :id", { id: id })
                                .getOne();

        if(user){
            delete user.password;
            return user;
        } else {
            throw new NotFoundException(CommonErrors.UserNotFound);
        }
    }
}
