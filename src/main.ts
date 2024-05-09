import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap(): Promise<void> {
    const fallbackPort = 3001;
    const port = parseInt(process.env.NEST_PORT) || fallbackPort;

    try {
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: 'http://will-be-added.com',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });

        app.useGlobalPipes(new ValidationPipe());

        await app.listen(port);
        console.log(`Application is running on port ${port}`);
    } catch (err) {
        console.error('Error finding an available port:', err);
    }
}

bootstrap();
