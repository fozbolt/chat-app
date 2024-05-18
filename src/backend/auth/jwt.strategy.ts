import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@root/backend/user/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { authConsts } from './consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConsts.secret,
        });
    }

    public validate(payload: Partial<User>): Partial<User> {
        return payload;
    }
}
