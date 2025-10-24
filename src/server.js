// src/server.js
import express from 'express';
import bookRoutes from './routes/book.routes.js';
import db from './config/db.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

(async () => {
  try {
    const [rows] = await db.execute('SELECT NOW() AS `current_time`');
    
    if (rows.length > 0) {
      console.log('✅ Connected to MySQL. Current time:', rows[0].current_time);
    } else {
      console.log('⚠️ Query returned no results');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); 
  }

  app.get('/welcome', (req, res) => {
    res.send({ message: 'Welcome to the Server!' });
  });

  app.use('/books', bookRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})();
