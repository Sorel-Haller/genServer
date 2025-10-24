// src/config/db.js
import 'dotenv/config';
import mysql from 'mysql2/promise';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in your .env file');
  process.exit(1);
}

let pool;

try {
  pool = mysql.createPool(DATABASE_URL);

  const [rows] = await pool.execute('SELECT NOW() AS `current_time`');
  console.log('✅ Connected to MySQL. Current time:', rows[0].current_time);
} catch (error) {
  console.error('❌ Failed to connect to MySQL:', error.message);
  process.exit(1);
}

export default pool;
