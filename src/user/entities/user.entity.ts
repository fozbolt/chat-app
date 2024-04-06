import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import {RoomUser} from "../../roomUser/entities/roomUser.entity";

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

    @Column({ name: 'is_active' })
    isActive: boolean;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'last_active_at' })
    lastActiveAt: Date;

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
}
