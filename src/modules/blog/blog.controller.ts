import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './models/dto/blog-register.dto';
import { Blog } from './models/entities/blog.entity';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() createBlogDto: CreateBlogDto,  @AuthUser() user: any): Promise<Blog> {
        return await this.blogService.createBlogPost(createBlogDto, user.userId);
    }

    @Get()
    async getAll(): Promise<Blog[]> {
        return await this.blogService.getAllBlogPosts();
    }
}
