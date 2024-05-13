import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { Message } from '../../message/entities/message.entity';
import { RoomUser } from '../../roomUser/entities/roomUser.entity';

@Unique(['username'])
@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'is_deleted', default: 0, type: 'tinyint' })
    isDeleted: number;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @UpdateDateColumn({ name: 'last_active_at', default: () => 'CURRENT_TIMESTAMP' })
    lastActiveAt: Date; //TODO update when user logs in? not the best estimation, but easy to implement -> wait for websockets

    @Column({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'country_id' })
    countryId: number;

    @OneToMany(() => Message, (message: Message) => message.user)
    message: Array<Message>;

    @OneToMany(() => RoomUser, (roomUser: RoomUser) => roomUser.user)
    roomUser: Array<RoomUser>;

    @OneToMany(() => RoomUser, (roomUser: RoomUser) => roomUser.user)
    updatedBy: Array<RoomUser>;
}
