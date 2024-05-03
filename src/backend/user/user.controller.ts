import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('add-user')
    async addUserAction(@Body() createUserDto: CreateUserDto) {
        return this.userService.addUser(createUserDto);
    }

    @Get('get-users')
    //dodati tu i dolje onda read dto?
    async getUsersAction() {
        return this.userService.getUsers();
    }

    // these are not implemented yet
    @Get('getUser/:userId')
    async getUserAction(@Param('userId') userId: number) {
        return this.userService.getUser(userId);
    }

    @Patch('updateRoomUser/user:id')
    async updateUserAction(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(+id, updateUserDto);
    }

    @Delete('delete/:id')
    async deleteUserAction(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }
}
