//create namespace to not have to import and use dotenv in multiple files and validation schema
import { configDotenv } from 'dotenv';

configDotenv();

export const jwtConstants = {
    secret: process.env.SECRET,
};
