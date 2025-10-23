import { Router } from "express";

const router = Router();

router.get('/books', (request, response) => {});
router.get('/books/:id', (request, response) => {
    response.json({
        id: request.params.id,
        title: "Sample Book",
    });        
});



router.post('/books', (request, response) => {});
router.put('/books/:id', (request, response) => {});
router.delete('/books/:id', (request, response) => {});


export default router;