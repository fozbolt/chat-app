import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/updateMessage.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // operations for messages are only called from room and roomUser currently
    @Get('get-message/:id')
    async getMessageAction(@Param('id') id: string) {
        return this.messageService.getMessage(+id);
    }

    @Patch('updateMessage-message/:id')
    async updateMessageAction(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messageService.updateMessage(+id, updateMessageDto);
    }

    @Delete('delete-message/:id')
    async deleteMessageAction(@Param('id') id: string) {
        return this.messageService.deleteMessage(+id);
    }
}
