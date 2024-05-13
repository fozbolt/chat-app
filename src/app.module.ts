import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@root/config/typeorm/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './backend/country/country.module';
import { MessageModule } from './backend/message/message.module';
import { RoomModule } from './backend/room/room.module';
import { RoomUserModule } from './backend/roomUser/roomUser.module';
import { UserModule } from './backend/user/user.module';

@Module({
    //paziti sto stavljam sve u .envjer smo to imali diskuiju
    // move connection to separate folder
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        UserModule,
        CountryModule,
        RoomModule,
        MessageModule,
        RoomUserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
