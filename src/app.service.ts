import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public postLoginGreeting(username: string): string {
        return `Hello ${username}`;
    }

    public homepageGreeting(): string {
        return 'chat app says hello';
    }
}
