import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Message } from '@root/backend/message/entities/message.entity';
import { Room } from '@root/backend/room/entities/room.entity';

import { CreateMessageDto } from '../message/dto/createMessage.dto';
import { MessageService } from '../message/message.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    public constructor(
        private readonly roomService: RoomService,
        private readonly messageService: MessageService,
    ) {}

    @Post('add-room-message/:roomId')
    // try renaming to createMessage and have a unique naming convention
    public async addRoomMessageAction(
        @Param('roomId')
        roomId: number,
        @Body()
        createMessageDto: CreateMessageDto,
    ): Promise<unknown> {
        return await this.messageService.addRoomMessage(createMessageDto, roomId);
    }

    @Get('get-room-messages/:roomId')
    public async getRoomMessagesAction(@Param('roomId') roomId: string): Promise<Array<Message>> {
        return await this.messageService.getRoomMessages(roomId);
    }

    /**
     *
     * @param roomId
     * @param userId
     */
    // TODO napraviti da ne moze drugi logirani korisnik ulaziti na tude rute samo ako upise ovaj url
    // Endpoint: probably still weird route
    @Get('get-room-messages-after-join/room/:roomId/user/:userId') //na nivou messagea, promijeniti rutu da nije toliko hacky, slati userID u filteru
    public async getRoomMessagesAfterJoinAction(
        @Param('roomId') roomId: number,
        @Param('userId') userId: number,
    ): Promise<Array<Message>> {
        return await this.messageService.getRoomMessagesAfterJoin(roomId, userId);
    }

    @Post('add-room')
    public async addRoomAction(
        @Body() createRoomDto: CreateRoomDto,
        @Req()
        req: { user: { userId: number } },
    ): Promise<CreateRoomDto> {
        const userId = req.user.userId; // Extracted from JWT and set in the request by the guard
        return await this.roomService.addRoom(createRoomDto, userId);
    }

    @Get('get-rooms')
    public async getRoomsAction(): Promise<Array<Room>> {
        return await this.roomService.getRooms();
    }

    // @Post('send-room-join-invitation')
    // public async sendRoomJoinInvitationAction(@Body() createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    //     return await this.roomService.sendRoomJoinInvitation(createRoomDto);
    // }

    //TODO
    // @Get('get-room/:id')
    // publicasync getRoomAction(
    //     @Param('id')
    //     id: string,
    // ) {
    //     return this.roomService.getRoom(+id);
    // }
    //
    // @Patch('updateRoom-room/:id')
    // async updateRoomAction(
    //     @Param('id')
    //     id: string,
    //     @Body()
    //     updateRoomDto: UpdateRoomDto,
    // ) {
    //     return this.roomService.updateRoom(+id, updateRoomDto);
    // }
    //
    // @Delete('delete-room/:id')
    // async deleteRoomAction(
    //     @Param('id')
    //     id: string,
    // ) {
    //     return this.roomService.deleteRoom(+id);
    // }
}
