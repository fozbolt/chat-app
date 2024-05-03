import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn({ name: 'message_id' })
    messageId: number;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'room_id', type: 'int' })
    roomId: number;

    @Column({ name: 'message_text', type: 'text' })
    messageText: string;

    @Column({ name: 'removed_at', type: 'timestamp', nullable: true })
    removedAt: Date;

    @Column({ name: 'edited_at', type: 'timestamp', nullable: true })
    editedAt: Date;

    @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'is_deleted', type: 'tinyint', default: 0 })
    isDeleted: number;

    @ManyToOne(() => Room, (room: Room) => room.message)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ManyToOne(() => User, (user: User) => user.message)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
