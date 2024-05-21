import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Roles } from '@root/backend/auth/auth.helper';
import { Role } from '@root/backend/auth/consts';
import { RoomUser } from '@root/backend/roomUser/entities/roomUser.entity';
import { UserHashAndRoomUsersList } from '@root/backend/roomUser/interfaces/roomUser.interface';

import { CreateRoomUserDto } from './dto/createRoomUser.dto';
import { UpdateRoomUserDto } from './dto/updateRoomUser.dto';
import { RoomUserService } from './roomUser.service';

@Controller('roomUser')
export class RoomUserController {
    public constructor(private readonly roomUserService: RoomUserService) {}

    /**
     * generates a join request for specified room
     * Maybe better name should be addRoomJoinRequest ali onda nije konzistentan s pravilima ostalih
     * @param roomId
     * @param createRoomUserDto
     * @param req
     */
    @Post('add-join-request/:roomId')
    public async addJoinRequestAction(
        @Param('roomId') roomId: number,
        @Body() createRoomUserDto: CreateRoomUserDto,
        @Req()
        req: { user: { userId: number } },
    ): Promise<string | UserHashAndRoomUsersList> {
        createRoomUserDto.userId = req.user.userId;
        createRoomUserDto.roomId = createRoomUserDto.roomId ? +createRoomUserDto.roomId : +roomId; // logic for autmoatic and manual room join request, dunno why createRoomUserDto.roomId needs string if its a number in dto
        return await this.roomUserService.addJoinRequest(createRoomUserDto);
    }

    @Get('get-approved-room-users/room/:roomId') //TODO: or is it better for the routes to be of shape ':roomId/users' to be more clear?
    public async getApprovedRoomUsersAction(@Param('roomId') roomId: number): Promise<Array<RoomUser>> {
        return await this.roomUserService.getApprovedRoomUsers(roomId);
    }

    @Patch('update-room-user/room/:roomId/user/:userId') // ili mozda hash?
    public async updateRoomUserAction(
        @Param('roomId') roomId: number,
        @Param('userId') userId: number,
        @Body() updateRoomUserDto: UpdateRoomUserDto,
    ): Promise<RoomUser> {
        return await this.roomUserService.updateRoomUser(roomId, userId, updateRoomUserDto);
    }

    @Delete('delete-room-user/:roomId')
    public async deleteRoomUserAction(@Param('id') id: string): Promise<string> {
        return await this.roomUserService.deleteRoomUser(+id);
    }

    @Roles(Role.Admin)
    @Post('send-room-join-invitation/:roomId')
    public async sendRoomJoinInvitationAction(
        @Param('roomId') roomId: number,
        @Body() createRoomUserDto: CreateRoomUserDto,
        @Req()
        req: { user: { userId: number } },
    ): Promise<string | UserHashAndRoomUsersList> {
        createRoomUserDto.userId = req.user.userId;
        createRoomUserDto.roomId = createRoomUserDto.roomId ? +createRoomUserDto.roomId : +roomId; // logic for autmoatic and manual room join request, dunno why createRoomUserDto.roomId needs string if its a number in dto
        return await this.roomUserService.sendRoomJoinInvitation(createRoomUserDto);
    }

    // @Get('get-room-user/:id')
    // public getRoomUserAction(@Param('id') id: string) {}
}
