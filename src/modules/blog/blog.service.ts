import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonErrors } from 'src/shared/errors/common-erros';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './models/dto/blog-register.dto';

import { Blog } from './models/entities/blog.entity';

@Injectable()
export class BlogService {

    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) { }

    async createBlogPost(createBlogDto: CreateBlogDto, user:any) {

        const blog = await this.blogRepository.create({...createBlogDto, user});

        try {
            await blog.save();
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }

        return blog;

    }

}
