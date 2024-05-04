import { Controller } from '@nestjs/common';

import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    public constructor(private readonly messageService: MessageService) {}

    // TODO
    // operations for messages are only called from room and roomUser currently
    // @Get('get-message/:id')
    // async getMessageAction(@Param('id') id: string) {
    //     return this.messageService.getMessage(+id);
    // }
    //
    // @Patch('updateMessage-message/:id')
    // async updateMessageAction(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    //     return this.messageService.updateMessage(+id, updateMessageDto);
    // }
    //
    // @Delete('delete-message/:id')
    // async deleteMessageAction(@Param('id') id: string) {
    //     return this.messageService.deleteMessage(+id);
    // }
}
