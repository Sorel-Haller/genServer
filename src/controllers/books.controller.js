
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

export const createBook = (request, response) => {
    response.json ({
        id: request.params.id,
        message: "Book created successfully",
    });
}

export const updateBook = (request, response) => {
    response.json ({
        id: request.params.id,
        message: "Book updated successfully",
    });
}

export const deleteBook = (request, response) => {
    response.json ({
        id: request.params.id,
        message: "Book deleted successfully",
    });
}   