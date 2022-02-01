import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './models/dto/blog-register.dto';

import { Blog } from './models/entities/blog.entity';

@Injectable()
export class BlogService {

    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) { }

    createBlogPost(createblogDto: CreateBlogDto) {
    }
}
