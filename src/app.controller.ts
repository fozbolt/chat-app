import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { AuthService } from '@root/backend/auth/auth.service';
import { JwtAuthGuard } from '@root/backend/auth/jwtAuthGuard';
import { LocalAuthGuard } from '@root/backend/auth/localAuthGuard';
import { User } from '@root/backend/user/entities/user.entity';

@Controller()
export class AppController {
    public constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: { user: Omit<User, 'password'> }): Promise<{ accessToken: string }> {
        // const username = req?.user?.username;
        // return this.appService.postLoginGreeting(username);

        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: { user: Omit<User, 'password'> }): Omit<User, 'password'> {
        return req.user;
    }

    @Get('/')
    public homepageGreeting(): string {
        return this.appService.homepageGreeting();
    }
}
