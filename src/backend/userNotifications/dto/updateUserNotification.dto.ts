import { PartialType } from '@nestjs/mapped-types';

import { CreateUserNotificationDto } from './createUserNotification.dto';

export class UpdateUserNotificationDto extends PartialType(CreateUserNotificationDto) {}
