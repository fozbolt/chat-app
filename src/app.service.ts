import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getHello(): string {
        return 'Chat app says hello';
    }
}
