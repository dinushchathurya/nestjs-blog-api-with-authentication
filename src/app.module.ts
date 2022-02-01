import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    TypeOrmModule.forRoot({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
    }),
    AuthModule,
    BlogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
