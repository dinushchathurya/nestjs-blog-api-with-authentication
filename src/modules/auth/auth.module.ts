import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from './models/entities/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        PassportModule,
        MailModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
            useFactory: async () => ({
              secret: process.env.JWT_SECRET,
            }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(
            [User]
        ),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
