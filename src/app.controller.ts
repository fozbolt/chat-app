import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { LocalAuthGuard } from '@root/backend/auth/local-auth.guard';
import { User } from '@root/backend/user/entities/user.entity';

@Controller()
export class AppController {
    public constructor(private readonly appService: AppService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: { user: Omit<User, 'password'> }): Promise<string> {
        const username = req?.user?.username;

        return this.appService.postLoginGreeting(username);
    }

    @Get('/')
    public homepageGreeting(): string {
        return this.appService.homepageGreeting();
    }
}
