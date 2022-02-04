import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonErrors } from 'src/shared/errors/common-erros';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './models/dto/blog-create.dto';
import { UpdateBlogDto } from './models/dto/blog-update.dto';
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

    async getAllBlogPosts() {
        return await this.blogRepository.find();
    }

    async getBlogPostById(id: number) {
        const blog = await this.blogRepository.findOne({ id });

        if(blog) {
            return blog;
        } else {
            throw new InternalServerErrorException(CommonErrors.BlogNotFound);
        }
    }

    async updateBlogPost(id: number, updateBlogDto: UpdateBlogDto, user:any) {
            
            const blog = await this.blogRepository.findOne({ id });
    
            if(!blog) {
                throw new InternalServerErrorException(CommonErrors.BlogNotFound);
            }
    
            if( blog.user.id === user) {
                await this.blogRepository.update({ id }, updateBlogDto);
                return await this.blogRepository.findOne({ id });
            } else {
                throw new InternalServerErrorException(CommonErrors.NotCreatedError);
            }
    }

    async deleteBlogPost(id: number , user:any) {

        const blog = await this.blogRepository.findOne({ id });

        if(!blog) {
            throw new InternalServerErrorException(CommonErrors.BlogNotFound);
        }

        if( blog.user.id === user) {
            await this.blogRepository.delete({ id });
            return blog;
        } else {
            throw new InternalServerErrorException(CommonErrors.NotCreatedError);
        }
    }

}
