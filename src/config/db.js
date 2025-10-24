import 'dotenv/config';
import mysql from 'mysql2/promise';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in your .env file');
  process.exit(1);
}

let connection;

try {
  connection = await mysql.createConnection(DATABASE_URL);
  console.log('✅ Connected to MySQL database');
} catch (error) {
  console.error('❌ Failed to connect to MySQL:', error.message);
  process.exit(1);
}

export default connection;
