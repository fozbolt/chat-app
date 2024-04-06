import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { ApprovalStatus } from '../enums/roomUsers.enum';

@Entity()
export class RoomUser {
    @PrimaryGeneratedColumn({ name: 'room_user_id' })
    roomUserId: number;

    @ManyToOne(() => User, (user) => user.roomUser)
    user: User;

    @ManyToOne(() => Room, (room) => room.roomUser)
    room: Room;

    @Column({
        type: 'enum',
        enum: ApprovalStatus,
        default: ApprovalStatus.PENDING,
        name: 'approval_status',
    })
    approvalStatus: string;

    @Column({ name: 'approved_at', nullable: true })
    approvedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @Column({ name: 'approved_by' })
    approvedBy: User;

    @Column({ name: 'left_at', nullable: true })
    leftAt: Date;

    @Column({ name: 'joined_at', default: () => 'CURRENT_TIMESTAMP' })
    joinedAt: Date;

    @Column({ name: 'hash', unique: true })
    hash: string;
}
