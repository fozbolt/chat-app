import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

configDotenv();

@Module({
    imports: [
        // di mi je ono da mi automatski assigna port ako nije slobodan?
        //sve ovo u .env i paziti sto stavljam jer smo to imali diskuciju
        // move connection to separate folder
        // bcrypt
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: parseInt(process.env.DB_PORT),
            entities: [User],
            synchronize: true, // should be false in production
        }),
        UserModule, //paziti ovo se ne dodoaje automatski ako ne gkorisitomo cli
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
