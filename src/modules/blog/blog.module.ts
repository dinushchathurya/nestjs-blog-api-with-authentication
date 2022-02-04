import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './models/entities/blog.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature(
            [Blog]
        ),
    ],
    providers: [BlogService],
    controllers: [BlogController]
})
export class BlogModule {}
