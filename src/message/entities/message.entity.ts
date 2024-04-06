import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn({ name: 'message_id' })
    messageId: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column({ type: 'int', name: 'room_id' })
    roomId: number;

    @Column({ type: 'text', name: 'message_text' })
    messageText: string;

    @Column({ type: 'timestamp', nullable: true, name: 'removed_at' })
    removedAt: Date;

    @Column({ type: 'timestamp', nullable: true, name: 'edited_at' })
    editedAt: Date;

    @Column({ type: 'tinyint', default: 0, name: 'is_deleted' })
    isDeleted: number;

    @ManyToOne(() => Room, (room) => room.message)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ManyToOne(() => User, (user) => user.message)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
