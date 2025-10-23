import express from 'express';

const app = express();
const PORT = 3000;

//app.use(express.json());

app.get('/welcome', (request, response) => { //päring jõuab ükskord serverini ja saab vastuse
    response.send('Welcome to the Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
