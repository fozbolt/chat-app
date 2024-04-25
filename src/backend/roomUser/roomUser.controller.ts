import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
    addRoomUserAction(@Body() createRoomUserDto: CreateRoomUserDto) {
        return this.roomUserService.addRoomUser(createRoomUserDto);
    }

    @Get('get-approved-room-users/room/:roomId') //TODO: or is it better for the routes to be of shape ':roomId/users' to be more clear?
    getApprovedRoomUsersAction(@Param('roomId') roomId: number) {
        return this.roomUserService.getApprovedRoomUsers(roomId);
    }

    @Get('get-room-user/:id')
    getRoomUserAction(@Param('id') id: string) {
        return;
    }

    @Patch('update-room-user/room/:roomId/user/:userId') // ili mozda hash?
    updateRoomUserAction(
        @Param('roomId') roomId: number,
        @Param('userId') userId: number,
        @Body() updateRoomUserDto: UpdateRoomUserDto,
    ) {
        return this.roomUserService.updateRoomUser(roomId, userId, updateRoomUserDto);
    }

    @Delete('delete-room-user/:id')
    deleteRoomUserAction(@Param('id') id: string) {
        return this.roomUserService.deleteRoomUser(+id);
    }
}
