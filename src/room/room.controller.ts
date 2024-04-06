import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
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

    @Post(':roomId')
    // try renaming to createMessage and have a unique naming convention
    createRoomMessage(
        @Param('roomId')
        roomId: string,
        @Body()
        createMessageDto: CreateMessageDto,
    ) {
        return this.messageService.create(createMessageDto, roomId);
    }

    @Get(':roomId')
    getRoomMessages(@Param('roomId') roomId: string) {
        return this.messageService.findAllMessages(roomId);
    }

    @Post()
    createRoom(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.create(createRoomDto);
    }

    @Get()
    findAll() {
        return this.roomService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.roomService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        updateRoomDto: UpdateRoomDto,
    ) {
        return this.roomService.update(+id, updateRoomDto);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.roomService.remove(+id);
    }
}
