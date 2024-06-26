import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public, Roles } from '@root/backend/auth/auth.helper';
import { Role } from '@root/backend/auth/consts';
import { User } from '@root/backend/user/entities/user.entity';

import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @Public()
    @Post('add-user')
    public async addUserAction(@Body() createUserDto: CreateUserDto): Promise<string> {
        return await this.userService.addUser(createUserDto);
    }

    @Get('get-users')
    //TODO dodati tu i dolje onda read dto?
    public async getUsersAction(): Promise<Array<User>> {
        return await this.userService.getUsers();
    }

    // these are not implemented yet
    @Get('getUserById/:userId')
    @Roles(Role.Admin)
    public async getUserAction(@Param('userId') userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }

    // TODO
    // @Patch('updateRoomUser/user:id')
    // public async updateUserAction(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    //     return this.userService.updateUser(+id, updateUserDto);
    // }
    //
    // @Delete('delete/:id')
    // public async deleteUserAction(@Param('id') id: string): Promise<string> {
    //     return this.userService.deleteUser(+id);
    // }
}
