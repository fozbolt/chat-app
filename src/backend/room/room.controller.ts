import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { CreateMessageDto } from '../message/dto/createMessage.dto';
import { MessageService } from '../message/message.service';
import { CreateRoomDto } from './dto/createRoom.dto';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
        private readonly messageService: MessageService,
    ) {}

    @Post('add-room-message/:roomId')
    // try renaming to createMessage and have a unique naming convention
    async addRoomMessageAction(
        @Param('roomId')
        roomId: number,
        @Body()
        createMessageDto: CreateMessageDto,
    ) {
        return this.messageService.addRoomMessage(createMessageDto, roomId);
    }

    @Get('get-room-messages/:roomId')
    async getRoomMessagesAction(@Param('roomId') roomId: string) {
        return this.messageService.getRoomMessages(roomId);
    }

    /**
     *
     * @param roomId
     * @param userId
     */
    // TODO napraviti da ne moze drugi logirani korisnik ulaziti na tude rute samo ako upise ovaj url
    // Endpoint: probably still weird route
    @Get('get-room-messages-after-join/room/:roomId/user/:userId') //na nivou messagea, promijeniti rutu da nije toliko hacky, slati userID u filteru
    async getRoomMessagesAfterJoinAction(@Param('roomId') roomId: number, @Param('userId') userId: number) {
        return this.messageService.getRoomMessagesAfterJoin(roomId, userId);
    }

    @Post('add-room')
    async addRoomAction(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.addRoom(createRoomDto);
    }

    @Get('get-rooms')
    async getRoomsAction() {
        return this.roomService.getRooms();
    }

    @Get('get-room/:id')
    async getRoomAction(
        @Param('id')
        id: string,
    ) {
        return this.roomService.getRoom(+id);
    }

    @Patch('updateRoom-room/:id')
    async updateRoomAction(
        @Param('id')
        id: string,
        @Body()
        updateRoomDto: UpdateRoomDto,
    ) {
        return this.roomService.updateRoom(+id, updateRoomDto);
    }

    @Delete('delete-room/:id')
    async deleteRoomAction(
        @Param('id')
        id: string,
    ) {
        return this.roomService.deleteRoom(+id);
    }
}
