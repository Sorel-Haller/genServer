
export const getAllBooks = (request, response) => {
    response.json ({
        message: "List of all books",
    });
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