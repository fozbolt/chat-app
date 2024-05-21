import { Controller, Get } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { AuthService } from '@root/backend/auth/auth.service';

@Controller()
export class AppController {
    public constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    // ### deprecated -> now global auth guard is used
    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req: { user: Omit<User, 'password'> }): Omit<User, 'password'> {
    //     return req.user;
    // }

    @Get('/')
    public homepageGreeting(): string {
        return this.appService.homepageGreeting();
    }
}
