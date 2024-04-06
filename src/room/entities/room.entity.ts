import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import { RoomUser } from '../../roomUser/entities/roomUser.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn({ name: 'room_id' })
    roomId: number;

    @Column({ length: 40 })
    name: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Column({ default: false, name: 'is_private' })
    isPrivate: number;

    @Column({ default: 0, name: 'is_deleted' })
    isDeleted: number;

    @OneToMany(() => Message, (message) => message.room)
    message: Array<Message>;

    @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
    roomUser: Array<RoomUser>;
}
