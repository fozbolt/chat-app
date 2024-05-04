import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './backend/country/country.module';
import { MessageModule } from './backend/message/message.module';
import { RoomModule } from './backend/room/room.module';
import { RoomUserModule } from './backend/roomUser/roomUser.module';
import { UserModule } from './backend/user/user.module';

configDotenv();

const dbPortString = process.env.DB_PORT;
const dbPort = dbPortString ? parseInt(dbPortString) : undefined;

@Module({
    //paziti sto stavljam sve u .envjer smo to imali diskuiju
    // move connection to separate folder
    imports: [
        TypeOrmModule.forRoot({
            database: process.env.DB_DATABASE,
            entities: [`${__dirname}/**/*.entity{.ts,.js}`],
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            port: dbPort,
            logging: true, // should be false in production
            synchronize: true, // should be false in production
            type: 'mariadb',
        }),
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
