import prisma from "../config/prisma.config.js";

export const getAllBooks = async (request, response) => {
    try {
        const books = await prisma.book.findMany();
        response.json ({
            message: "List of all books",
            data: [books]
        });
    } catch (exception) {
        console.log(exception);
        response.status(500).json ({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getBookById = (request, response) => {
    response.json ({
        id: request.params.id,
        title: "Sample Book",
    });
}

export const createBook = (request, response) => {}

export const updateBook = (request, response) => {}

export const deleteBook = (request, response) => {}   