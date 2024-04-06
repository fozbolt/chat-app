import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as portfinder from 'portfinder';

dotenv.config(); //different than in app module

async function bootstrap() {
    const nestPortString = process.env.NEST_PORT;
    const desiredPort = nestPortString ? parseInt(nestPortString) : 3001;

    try {
        const port = await portfinder.getPortPromise({ port: desiredPort });
        const app = await NestFactory.create(AppModule);
        await app.listen(port);
        console.log(`Application is running on port ${port}`);
    } catch (err) {
        console.error('Error finding an available port:', err);
    }
}

bootstrap();
