import { User } from '@root/backend/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Message } from '../../message/entities/message.entity';
import { RoomUser } from '../../roomUser/entities/roomUser.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn({ name: 'room_id' })
    roomId: number;

    @Column({ length: 40 })
    name: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @Column({ default: 0, name: 'is_private', type: 'tinyint' })
    isPrivate: number;

    @Column({ default: 0, name: 'is_deleted', type: 'tinyint' })
    isDeleted: number;

    @OneToMany(() => Message, (message) => message.room)
    message: Array<Message>;

    @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
    roomUser: Array<RoomUser>;

    @ManyToOne(() => User, (user) => user.rooms)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;
}
