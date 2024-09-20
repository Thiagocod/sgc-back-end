import dotenv from 'dotenv'

dotenv.config({path: '.env.local'});

export const config ={
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10): 3000,
    portExpress: process.env.PORT ? parseInt(process.env.PORT, 10): 3000
  };