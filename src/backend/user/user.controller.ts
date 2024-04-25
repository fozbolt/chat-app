import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('add-user')
    async addUserAction(@Body() createUserDto: CreateUserDto) {
        return await this.userService.addUser(createUserDto);
    }

    @Get('get-users')
    //dodati tu i dolje onda read dto?
    async getUsersAction() {
        return await this.userService.getUsers();
    }

    // these are not implemented yet
    @Get('getUser/:userId')
    async getUserAction(@Param('userId') userId: number) {
        return await this.userService.getUser(userId);
    }

    @Patch('updateRoomUser/user:id')
    async updateUserAction(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(+id, updateUserDto);
    }

    @Delete('delete/:id')
    async deleteUserAction(@Param('id') id: string) {
        return await this.userService.deleteUser(+id);
    }
}
