import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
    const port = process.env.NEST_PORT || 3001;

    try {
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());

        await app.listen(port);
        console.log(`Application is running on port ${port}`);
    } catch (err) {
        console.error('Error finding an available port:', err);
    }
}

bootstrap();
