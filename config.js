import dotenv from 'dotenv';

dotenv.config();

export const PORT = +process.env.PORT || 8000;
export const NODE_ENV = (process.env.NODE_ENV || 'DEVELOPMENT').toUpperCase();
export const SECRET_KEY = process.env.SECRET_KEY || 'dev-key';
export const SALT_ROUNDS = +process.env.SALT_ROUNDS || 2;