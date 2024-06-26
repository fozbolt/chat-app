import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController], //ovo isto dodano naknadno
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
