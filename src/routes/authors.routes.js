import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { authorSchema } from "../validations/author.validation.js";

import { 
  getAllAuthors, 
  getAuthorById, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor 
} from "../controllers/authors.controller.js";

const router = Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', validate(authorSchema), createAuthor);
router.put('/:id', validate(authorSchema), updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
