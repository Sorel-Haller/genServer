import express from 'express';
import helmet from "helmet";
import limiter from "./config/rateLimiter.js";
import bookRoutes from './routes/book.routes.js';
import authorRoutes from "./routes/author.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import errorHandler from "./middlewares/errorHandler.js"; 


const app = express();
const PORT = 3000;

app.use(limiter);
app.use(helmet());
app.use(express.json());

// Test marsuut, et server töötab
app.get('/welcome', (request, response) => {
    response.send({
        message: 'Welcome to the API',
    });
});

// Erinevad marsuudid eraldi baasteedega, et vältida konflikte
app.use('/api/v1', bookRoutes);
app.use('/api/v1', authorRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', categoryRoutes); 

app.use(errorHandler);

process.on("Uncaught Eception" , (err) => { 
    console.error("Uncaught Eception", err.message);
    process.exit(1);
});

process.on("unhandledRejection" , (err) => { 
    console.error("Unhandled Promised Rejection", err.message);
    process.exit(1);
});

// Server käivitub
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
