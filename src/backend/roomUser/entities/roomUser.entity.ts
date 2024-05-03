import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { ApprovalStatus } from '../enums/roomUsers.enum';

@Entity()
export class RoomUser {
    @PrimaryGeneratedColumn({ name: 'room_user_id' })
    roomUserId: number;

    @ManyToOne(() => User, (user) => user.roomUser)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Room, (room) => room.roomUser)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @Column({
        type: 'enum',
        enum: ApprovalStatus,
        default: ApprovalStatus.PENDING,
        name: 'approval_status',
    })
    approvalStatus: ApprovalStatus;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;

    @Column({ name: 'left_at', nullable: true })
    leftAt: Date;

    @CreateDateColumn({
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    requestedAt: Date;

    @Column({ name: 'hash', unique: true })
    hash: string;
}
