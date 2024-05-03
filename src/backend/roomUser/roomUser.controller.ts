import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomUserService } from './roomUser.service';
import { CreateRoomUserDto } from './dto/createRoomUser.dto';
import { UpdateRoomUserDto } from './dto/updateRoomUser.dto';

@Controller('roomUser')
export class RoomUserController {
    constructor(private readonly roomUserService: RoomUserService) {}

    /**
     * generates a join request for specified room
     * Maybe better name should be addRoomJoinRequest ali onda nije konzistentan s pravilima ostalih
     * @param createRoomUserDto
     */
    @Post('add-room-user/:roomId')
    async addRoomUserAction(@Body() createRoomUserDto: CreateRoomUserDto) {
        return this.roomUserService.addRoomUser(createRoomUserDto);
    }

    @Get('get-approved-room-users/room/:roomId') //TODO: or is it better for the routes to be of shape ':roomId/users' to be more clear?
    async getApprovedRoomUsersAction(@Param('roomId') roomId: number) {
        return this.roomUserService.getApprovedRoomUsers(roomId);
    }

    @Get('get-room-user/:id')
    getRoomUserAction(@Param('id') id: string) {}

    @Patch('update-room-user/room/:roomId/user/:userId') // ili mozda hash?
    async updateRoomUserAction(@Param('roomId') roomId: number, @Param('userId') userId: number, @Body() updateRoomUserDto: UpdateRoomUserDto) {
        return this.roomUserService.updateRoomUser(roomId, userId, updateRoomUserDto);
    }

    @Delete('delete-room-user/:id')
    deleteRoomUserAction(@Param('id') id: string) {
        return this.roomUserService.deleteRoomUser(+id);
    }
}
