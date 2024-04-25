import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/updateMessage.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // operations for messages are only called from room and roomUser currently
    @Get('get-message/:id')
    async getMessageAction(@Param('id') id: string) {
        return await this.messageService.getMessage(+id);
    }

    @Patch('updateMessage-message/:id')
    async updateMessageAction(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
        return await this.messageService.updateMessage(+id, updateMessageDto);
    }

    @Delete('delete-message/:id')
    async deleteMessageAction(@Param('id') id: string) {
        return await this.messageService.deleteMessage(+id);
    }
}
