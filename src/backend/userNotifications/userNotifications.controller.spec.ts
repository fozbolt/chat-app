import { Test, TestingModule } from '@nestjs/testing';

import { UserNotificationsController } from './userNotifications.controller';
import { UserNotificationsService } from './userNotifications.service';

describe('UserNotificationsController', () => {
    let controller: UserNotificationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserNotificationsController],
            providers: [UserNotificationsService],
        }).compile();

        controller = module.get<UserNotificationsController>(UserNotificationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
