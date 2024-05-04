import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomUser } from '@root/backend/roomUser/entities/roomUser.entity';

import { CreateRoomUserDto } from './dto/createRoomUser.dto';
import { UpdateRoomUserDto } from './dto/updateRoomUser.dto';
import { RoomUserService } from './roomUser.service';

@Controller('roomUser')
export class RoomUserController {
    public constructor(private readonly roomUserService: RoomUserService) {}

    /**
     * generates a join request for specified room
     * Maybe better name should be addRoomJoinRequest ali onda nije konzistentan s pravilima ostalih
     * @param createRoomUserDto
     */
    @Post('add-room-user/:roomId')
    public async addRoomUserAction(@Body() createRoomUserDto: CreateRoomUserDto): Promise<
        | string
        | {
              roomUserHash: string;
              roomUsers: Array<RoomUser>;
          }
    > {
        return await this.roomUserService.addRoomUser(createRoomUserDto);
    }

    @Get('get-approved-room-users/room/:roomId') //TODO: or is it better for the routes to be of shape ':roomId/users' to be more clear?
    public async getApprovedRoomUsersAction(@Param('roomId') roomId: number): Promise<Array<RoomUser>> {
        return await this.roomUserService.getApprovedRoomUsers(roomId);
    }

    // @Get('get-room-user/:id')
    // public getRoomUserAction(@Param('id') id: string) {}

    @Patch('update-room-user/room/:roomId/user/:userId') // ili mozda hash?
    public async updateRoomUserAction(
        @Param('roomId') roomId: number,
        @Param('userId') userId: number,
        @Body() updateRoomUserDto: UpdateRoomUserDto,
    ): Promise<RoomUser> {
        return await this.roomUserService.updateRoomUser(roomId, userId, updateRoomUserDto);
    }

    @Delete('delete-room-user/:id')
    public async deleteRoomUserAction(@Param('id') id: string): Promise<string> {
        return await this.roomUserService.deleteRoomUser(+id);
    }
}
