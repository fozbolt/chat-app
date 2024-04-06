import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/updateMessage.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messageService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        return this.messageService.update(+id, updateMessageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.messageService.remove(+id);
    }
}
