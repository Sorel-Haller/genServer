import { Router } from "express"; //nagu wifi router, selle sees on 404 sisse ehitatud,  kui vastust ei leia siis rakendub see
import { validate } from "../middleware/validate.middleware.js";
import { bookSchema } from "../validations/book.validation.js";
import { getAllBooks, getBookById, updateBook, deleteBook, createBook }  from "../controllers/books.controller.js";

const router = Router();

router.get('/books', getAllBooks);   //kõikide raamatute toomine
// https://raamatupood.ee/api/v1/books/(:id) => 838383 kontrollime kas sellle id-ga raamat on olemas. Endpoint URL

router.get('/books/:id', getBookById);  //üksiku raamatu toomine, koolon tähendab dünaamilisust, sinna paneb klient numbri 
// router.get('/books/:id/authors/:authirId);

router.post('/books', validate(bookSchema), createBook);  //create
router.put('/books/:id', validate(bookSchema), updateBook); //muutmine
router.delete('/books/:id', deleteBook);


export default router;