// src/server.js
import express from 'express';
import bookRoutes from './routes/book.routes.js';
import db from './config/db.js'; // MySQL connection

const app = express();
const PORT = 3000;

app.use(express.json());

try {
  const [result] = await db.query('SELECT NOW() AS current_time');
  console.log('✅ Connected to MySQL. Current time:', result[0].current_time);
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
}

app.get('/welcome', (req, res) => {
  res.send({ message: 'Welcome to the Server!' });
});

app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
