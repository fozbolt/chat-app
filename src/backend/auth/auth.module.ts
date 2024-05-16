import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@root/backend/auth/local.strategy';
import { UserModule } from '@root/backend/user/user.module';

import { AuthService } from './auth.service';

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
