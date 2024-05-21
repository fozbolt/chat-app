import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@root/backend/user/entities/user.entity';
import { UserService } from '@root/backend/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    public constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

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

    public login(user: User): { accessToken: string } {
        const payload = { password: user.password, ...user };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    /**
     * workarund for logout with refreshing token, returns new token, put it in private.env
     * doesn't work since old token is still valid until it expires, maybe blacklist it
     * @param {string} token
     * @returns {Promise<string>}
     */
    public async logout(token: string): Promise<string> {
        try {
            const payload = await this.jwtService.verify(token);
            return this.jwtService.sign({ userId: payload.userId });
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
