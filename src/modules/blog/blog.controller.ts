import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './models/dto/blog-create.dto';
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

    @Get('/:id')
    async getById(@Req() req): Promise<Blog> {
        return await this.blogService.getBlogPostById(req.params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async delete(@Req() req, @AuthUser() user: any): Promise<Blog> {
        return await this.blogService.deleteBlogPost(req.params.id, user.userId);
    }
}
