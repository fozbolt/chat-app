import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/backend/user/entities/user.entity';
import { UserNotification } from '@root/backend/userNotifications/entities/userNotification.entity';

import { UserNotificationsController } from './userNotifications.controller';
import { UserNotificationsService } from './userNotifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserNotification, User])],
    controllers: [UserNotificationsController],
    providers: [UserNotificationsService],
})
export class UserNotificationsModule {}
