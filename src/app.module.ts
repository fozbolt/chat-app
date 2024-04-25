import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { MessageModule } from './backend/message/message.module';
import { UserModule } from './backend/user/user.module';
import { CountryModule } from './backend/country/country.module';
import { RoomModule } from './backend/room/room.module';
import { RoomUserModule } from './backend/roomUser/roomUser.module';

configDotenv();

const dbPortString = process.env.DB_PORT;
const dbPort = dbPortString ? parseInt(dbPortString) : undefined;

@Module({
    //sve ovo u .env i paziti sto stavljam jer smo to imali diskuciju
    // move connection to separate folder
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: dbPort,
            synchronize: true, // should be false in production
            logging: true, // should be false in production
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
