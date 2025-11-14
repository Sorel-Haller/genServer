import prisma from '../config/prisma.js';

export const getAllAuthors = async (request, response) => {
  try {
    const { sort, sort_direction, take, page } = request.query;

    const authors = await prisma.author.findMany({
      orderBy: {
        [sort || 'name']: sort_direction || 'asc'
      },
      skip: (Number(take) || 10) * ((Number(page) || 1) - 1),
      take: Number(take) || 10
    });

    response.json({
      message: 'All authors',
      data: authors,
    });
  } catch (exception) {
    console.log(exception);
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const getAuthorById = async (request, response) => {
  try {
    const id = Number(request.params?.id);

    const author = await prisma.author.findUnique({
      where: { id }
    });

    if (!author) {
      return response.status(404).json({ message: 'Author Not Found' });
    }

    response.status(200).json({
      message: 'Successfully Found Author',
      data: author
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const createAuthor = async (request, response) => {
  try {
    const { name } = request.body;

    const newAuthor = await prisma.author.create({
      data: { name }
    });

    response.status(201).json({
      message: 'Successfully Created Author',
      data: newAuthor
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const updateAuthor = async (request, response) => {
  try {
    const id = Number(request.params.id);
    const { name } = request.body;

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: { name }
    });

    response.status(200).json({
      message: 'Successfully Updated Author',
      data: updatedAuthor
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const deleteAuthor = async (request, response) => {
  try {
    const id = Number(request.params.id);

    await prisma.author.delete({
      where: { id }
    });

    response.status(200).json({
      message: 'Successfully Deleted Author'
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};
