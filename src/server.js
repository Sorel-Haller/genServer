import express from 'express';
import bookRoutes from './routes/book.routes.js';

const app = express();
const PORT = 3000;

//app.use(express.json());

app.get('/welcome', (request, response) => { //päring jõuab ükskord serverini ja saab vastuse
    response.send({
        message:'Welcome to the Server!',
    });
});

app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

