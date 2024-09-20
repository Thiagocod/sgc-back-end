import mysql2 from 'mysql2';
import dotenv from 'dotenv'

dotenv.config({path: '.env.local'});



export const connection = mysql2.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10): 3000,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });