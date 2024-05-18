//create namespace to not have to import and use dotenv in multiple files and validation schema
import { configDotenv } from 'dotenv';

configDotenv();

// TODO: separate this since these consts are for different purposes?
export const authConsts = {
    secret: process.env.SECRET,
    IS_PUBLIC: 'isPublic',
    ROLES: 'roles',
};

// TODO: this is temporary solution -> create role and rolePermission entities and fetch roles from the database
export enum Role {
    Admin = 'admin',
    User = 'user',
}

export const roleMappings = {
    '1': Role.Admin,
    '2': Role.User,
};
