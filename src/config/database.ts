import { createPool } from 'mysql2/promise';
import { config } from './dotenv';

const pool = createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password
});

export default pool;