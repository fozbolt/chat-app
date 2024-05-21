import { User } from '@root/backend/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserNotification {
    @PrimaryGeneratedColumn()
    user_notification_id: number;

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;

    @ManyToOne(() => User, (user) => user.sentNotifications)
    sentBy: User;
}
