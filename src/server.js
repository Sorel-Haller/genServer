import express from 'express';
import bookRoutes from './routes/book.routes.js';
import authorRoutes from "./routes/author.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import { errorHandler } from ".middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

// Middleware, mis lubab töödelda JSON body-sid
app.use(express.json());

// Test marsuut, et server töötab
app.get('/welcome', (request, response) => {
    response.send({
        message: 'Welcome to the API',
    });
});

// Erinevad marsuudid eraldi baasteedega, et vältida konflikte
app.use('/api/v1', bookRoutes);    // Raamatud
app.use('/api/v1', authorRoutes);  // Autorid
app.use('/api/v1', authRoutes);  // Autentimine (login, register)
app.use('/api/v1', categoryRoutes); 

app.use(errorHandler);

// Server käivitub
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
