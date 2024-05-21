import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv();

const dbPortString = process.env.DB_PORT;
const dbPort = dbPortString ? parseInt(dbPortString) : undefined;

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'], // https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: dbPort,
    logging: true, // should be false in production
    migrations: ['dist/database/mariadb/migrations/*.js'], // https://stackoverflow.com/questions/61259812/cannot-use-import-statement-outside-a-module-in-typeorm-migration-when-run-nes
    synchronize: true, //comment this later
};

export const connectionSource = new DataSource(typeormConfig as DataSourceOptions);
