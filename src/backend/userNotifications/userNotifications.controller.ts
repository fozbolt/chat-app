import { Controller } from '@nestjs/common';

import { UserNotificationsService } from './userNotifications.service';

@Controller('userNotifications')
export class UserNotificationsController {
    public constructor(private readonly userNotificationsService: UserNotificationsService) {}

    // TODO
    // @Post()
    // create(@Body() createUserNotificationDto: CreateUserNotificationDto) {
    //     return this.userNotificationsService.create(createUserNotificationDto);
    // }
    //
    // @Get()
    // findAll() {
    //     return this.userNotificationsService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.userNotificationsService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserNotificationDto: UpdateUserNotificationDto) {
    //     return this.userNotificationsService.update(+id, updateUserNotificationDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userNotificationsService.remove(+id);
    // }
}
