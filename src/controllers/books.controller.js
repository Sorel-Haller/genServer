import prisma from '../config/prisma.js';

// GET all books with pagination and sorting
export const getAllBooks = async (req, res) => {
  try {
    const { sort, sort_direction, take, page } = req.query;

    const books = await prisma.book.findMany({
      orderBy: {
        [sort || 'title']: sort_direction || 'asc',
      },
      skip: (Number(take) || 10) * ((Number(page) || 1) - 1),
      take: Number(take) || 10,
    });

    res.status(200).json({
      message: 'All books',
      data: books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// GET book by ID
export const getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid book ID' });

    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book found', data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// CREATE a new book
export const createBook = async (req, res) => {
  try {
    const { title, description, thumbnail_url, release_year } = req.body;

    const newBook = await prisma.book.create({
      data: {
        title,
        description,
        thumbnail_url,
        release_year: Number(release_year),
      },
    });

    res.status(201).json({ message: 'Book created', data: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// UPDATE an existing book
export const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid book ID' });

    const { title, description, thumbnail_url, release_year } = req.body;

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail_url,
        release_year: Number(release_year),
      },
    });

    res.status(200).json({ message: 'Book updated', data: updatedBook });
  } catch (err) {
    console.error(err);

    if (err.code === 'P2025') return res.status(404).json({ message: 'Book not found' });

    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// DELETE a book
export const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid book ID' });

    await prisma.book.delete({ where: { id } });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);

    if (err.code === 'P2025') return res.status(404).json({ message: 'Book not found' });

    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
