import { Injectable } from '@nestjs/common';
import { User } from '@root/backend/user/entities/user.entity';
import { UserService } from '@root/backend/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    public constructor(private readonly userService: UserService) {}

    public async validateUser(username: string, inputPassword: string): Promise<Omit<User, 'password'> | null> {
        // TODO add check if user is already logged in and return message
        const user = await this.userService.getUserByUsername(username);
        const isMatch = await bcrypt.compare(inputPassword, user.password);

        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
