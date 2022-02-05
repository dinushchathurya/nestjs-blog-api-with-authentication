import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/decorators/role.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { User } from '../auth/models/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor( private userService: UserService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('all')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    async findOne(@Req() req){
        return this.userService.getUserById(req.params.id);
    }

}
