import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { authorSchema } from "../validations/author.validation.js";

import { 
  getAllAuthors, 
  getAuthorById, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor 
} from "../controllers/author.controller.js";

const router = Router();

router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorById);
router.post('/authors', validate(authorSchema), createAuthor);
router.put('/authors/:id', validate(authorSchema), updateAuthor);
router.delete('/authors/:id', deleteAuthor);

export default router;
