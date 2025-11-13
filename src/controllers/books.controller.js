import { response } from 'express';
import prisma from '../config/prisma.config.js';


export const getAllBooks = async (request, response) => {
  try {
    const books = await prisma.book.findMany(); // prisma ORM kaudu toome kõik raamatud andmebaasist
    response.json({                  
      message: 'All books',  // saadame tagasi sõnumi, et kõik raamatud on saadaval
      data: books            // lisame andmevälja, kus on kõik leitud raamatud
     }) 
  
  } catch (exception) {       // kui päringu või andmebaasiga tekib probleem
    console.log(exception);   // logime veateate serveri konsooli
    response.status(500).json({ // saadame kliendile error vastuse
      message: "Something went wrong",
      error: exception.message
    })
  }
};

export const getBookById = async (request, response) => { // funktsioon ühe raamatu pärimiseks
  // URL näide: https://raamatupood.ee/api/v1/books/555
  try {
      const idFromUrl = request.params?.id; // võtame URL-ist raamatu ID, ? - turvaline ligipääs, kui param olemas

      const book = await prisma.book.findUnique({ // Prisma abil otsime ühe raamatu unikaalse ID järgi
        where: {
          id: Number(idFromUrl)  // teisendame ID numbriks, sest andmebaasis on number
        }
      });

    response.status(200).json({ // kui raamat leitakse, saadame tagasi 200 ja raamatu andmed
      message: 'Successfully Found Book',
      data:book
  })  

   } catch (exception) {  // kui midagi läheb valesti
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    })

   }

};

export const createBook = async (request, response) => {
    try {
        const {title, description, thumbnail_url, release_year, } = request.body; // võtame kliendilt saadetud andmed uue raamatu loomiseks
        
    //    if (!title || !description || !thumbnail_url || !release_year) { // kontrollime, kas kõik vajalikud väljad on olemas
    //        return response.status(400).json({ // kui mõni väli puudub, tagastame 400 Bad Request
    //            message: 'Missing required fields'
    //        });
    //    }

        const newBook = await prisma.book.create({ // Prisma abil loome uue kirje
            data: {
                title,                 // raamatu pealkiri
                description,           // raamatu kirjeldus
                thumbnail_url,         // raamatu pisipilt URL
                release_year: Number(release_year), // välja aastaarv teisendame numbriks
            }
        });

        response.status(201).json({ // 201 Created status koos uue raamatu andmetega
            message: 'Book created successfully',
            data: newBook
        })
    } catch (exception) {  // kui midagi läheb valesti
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateBook = async (request, response) => {
    try {
        const { id } = request.params; // võtame URL-ist raamatu ID
        const { title, description, thumbnail_url, release_year } = request.body; // võtame kliendi poolt saadetud uuendatud andmed

        const updatedBook = await prisma.book.update({ // Prisma abil uuendame raamatu kirjet
            where: {
                id: Number(id) // ID teisendame numbriks
            },
            data: {
                title,
                description,
                thumbnail_url,
                release_year: Number(release_year),
            }
        });

        if (!updatedBook) { // kui raamatut ei leita, tagastame 404
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        response.status(200).json({ // kui uuendus õnnestus, tagastame 200 ja uuendatud raamatu
            message: 'Book updated successfully',
            data: updatedBook
        });

    } catch (exception) {  // kui midagi läheb valesti
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteBook = async (request, response) => {
    try {
        const bookId = request.params?.id; // võtame URL-ist raamatu ID

        await prisma.book.delete({ // Prisma abil kustutame raamatu ID järgi
            where: {
                id: Number(bookId) // teisendame ID numbriks
            }
        })
    } catch (exception) { // kui kustutamisel probleem
        response.status(200).json({ // siin veateate asemel on sõnum "Book deleted successfully" (veidi eksitav)
            message: 'Book deleted successfully',
            error: exception.message
        })
    }
};