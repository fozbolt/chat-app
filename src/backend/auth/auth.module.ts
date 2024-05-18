import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConsts } from '@root/backend/auth/consts';
import { JwtStrategy } from '@root/backend/auth/jwt.strategy';
import { LocalStrategy } from '@root/backend/auth/local.strategy';
import { UserModule } from '@root/backend/user/user.module';

import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: authConsts.secret,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
