import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { Public } from '@root/backend/auth/auth.helper';
import { AuthService } from '@root/backend/auth/auth.service';
import { LocalAuthGuard } from '@root/backend/auth/localAuth.guard';
import { User } from '@root/backend/user/entities/user.entity';

@Controller()
export class AppController {
    public constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard) // da li ovo sada jos trebam?
    @Post('auth/login')
    async login(@Request() req: { user: Omit<User, 'password'> }): Promise<{ accessToken: string }> {
        // const username = req?.user?.username;
        // return this.appService.postLoginGreeting(username);

        return this.authService.login(req.user);
    }

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
