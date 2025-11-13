import { response } from 'express';
import prisma from '../config/prisma.config.js';


export const getAllBooks = async (request, response) => {
  try {
    const books = await prisma.book.findMany(); // muutuja lokaalne, mille sisse võtame prisma (ORM)kaudu raamatud ja kasutame find many
    response.json({                  
      message: 'All books',
      data: books
     }) 
  
  } catch (exception) {       // kui on jama, andmebaasi v raamatu leidmisega, siis vastame erroriga
    console.log(exception);
    response.status(500).json({
      message: "Something went wrong",
      error: exception.message
    })
  }
};


export const getBookById = async (request, response) => { // tahame pärida 1 raamatut. 
  //https://raamatupood.ee/api/v1/books/555
 
   try {
      const idFromUrl = request.params?.id;            //? - kui param(555) on olemas, siis too. salvesatme kliendi id => IdFromUrl-i

      const book = await prisma.book.findUnique({     // saime id, tegime päringu, kontrollime kas saime vastuse,
        where: {
          id: Number(idFromUrl)
        }
      });

    response.status(200).json({                  // kui leiame raamatu, siis toome tagasi
      message: 'Successfully Found Book',
      data:book
  })  

   } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    })

   }

};

export const createBook = async (request, response) => {
    try {
        const {title, description, thumbnail_url, release_year, } = request.body; //saame kliendilt raamatu andmed
        
        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                thumbnail_url,
                release_year: Number(release_year),
            }
        });

        response.status(201).json({
            message: 'Book created successfully',
            data: newBook
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateBook = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, description, thumbnail_url, release_year } = request.body;

        const updatedBook = await prisma.book.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                thumbnail_url,
                release_year: Number(release_year),
            }
        });

        if (!updatedBook) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        response.status(200).json({
            message: 'Book updated successfully',
            data: updatedBook
        });

    } catch (error) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteBook = async (request, response) => {
    try {
        const bookId = request.params?.id;

        await prisma.book.delete({
            where: {
                id: Number(bookId)
            }
        })
    } catch (exception) {
        response.status(200).json({
            message: 'Book deleted successfully',
            error: exception.message
        })
    }
};