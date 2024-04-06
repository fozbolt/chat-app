import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

class FindConditions<T> {}

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    create(createMessageDto: CreateMessageDto, roomId: string) {
        // ili je bolje ovo napraviti vec u room kontroleru?
        createMessageDto.roomId = parseInt(roomId); //quick fix
        //add safety
        return this.messageRepository.save(createMessageDto);
    }

    async findAllMessages(roomId: string): Promise<Message[]> {
        const roomIdParsed = parseInt(roomId);
        const messages = await this.messageRepository.find({
            where: { roomId: roomIdParsed },
        });

        // const messages1 = await this.messageRepository
        //     .createQueryBuilder('message')
        //     .where('message.room_id = :roomId', { roomId: roomIdParsed })
        //     .getMany();

        return messages;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageDto: UpdateMessageDto) {
        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
}
