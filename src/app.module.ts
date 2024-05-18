import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@root/backend/auth/auth.module';
import { JwtAuthGuard } from '@root/backend/auth/jwtAuth.guard';
import { typeormConfig } from '@root/config/typeorm/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './backend/country/country.module';
import { MessageModule } from './backend/message/message.module';
import { RoomModule } from './backend/room/room.module';
import { RoomUserModule } from './backend/roomUser/roomUser.module';
import { UserModule } from './backend/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        UserModule,
        CountryModule,
        RoomModule,
        MessageModule,
        RoomUserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        AppService,
    ],
})
export class AppModule {}
