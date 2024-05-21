import { Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Public } from '@root/backend/auth/auth.helper';
import { AuthService } from '@root/backend/auth/auth.service';
import { LocalAuthGuard } from '@root/backend/auth/localAuth.guard';
import { User } from '@root/backend/user/entities/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public loginAction(@Req() req: { user: User }): { accessToken: string } {
        // const username = req?.user?.username;
        // return this.appService.postLoginGreeting(username);

        return this.authService.login(req.user);
    }

    @Post('logout')
    public async logoutAction(@Req() req: Request): Promise<string> {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('No authorization header provided');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        await this.authService.logout(token);
        return 'Logged out successfully';
    }
}
