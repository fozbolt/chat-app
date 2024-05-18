//create namespace to not have to import and use dotenv in multiple files and validation schema
import { configDotenv } from 'dotenv';

configDotenv();

// TODO: separate this since these consts are for different purposes?
export const authConsts = {
    secret: process.env.SECRET,
    IS_PUBLIC: 'isPublic',
};
