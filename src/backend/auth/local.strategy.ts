import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@root/backend/user/entities/user.entity';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: AuthService) {
        super();
    }

    private async validate(username: string, password: string): Promise<Omit<User, 'password'> | string> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }
        return user;
    }
}
