import prisma from '../config/prisma.js';
import { QueryBuilder } from "../utils/QueryBuilder.js";
import NotFoundError from "../utils/NotFoundError.js";
import ValidationError from "../utils/ValidationError.js";

export const getAllAuthors = async (request, response, next) => {
    try {
        const Builder = new QueryBuilder(request.query, {
            defaultSort: 'created_at',
            defaultTake: 10,
            allowedSorts: ['created_at', 'name'],
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true }}
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [authors, count] = await Promise.all([
            prisma.author.findMany(prismaQuery),
            prisma.author.count({ where: prismaQuery.where })
        ]);

        const meta = Builder.getPaginationMeta(count);

        response.status(200).json({
            message: 'All authors',
            data: authors,
            meta
        });

    } catch (exception) {
        next(exception);
    }
};

export const getAuthorById = async (request, response, next) => {
    try {
        const idFromURL = request.params?.id;

        const author = await prisma.author.findUnique({
            where: {
                id: Number(idFromURL)
            }
        });

        if (!author) {
            throw new NotFoundError(`Author with id ${idFromURL} not found`);
        }

        response.status(200).json({
            message: 'Successfully Found Author',
            data: author
        });

    } catch (exception) {
        next(exception);
    }
};

export const createAuthor = async (request, response, next) => {
    try {
        const { name } = request.body;

        if (!name) {
            throw new ValidationError("Author name is required", {
                field: "name"
            });
        }

        const newAuthor = await prisma.author.create({
            data: { name }
        });

        response.status(201).json({
            message: 'Successfully Created Author',
            data: newAuthor
        });

    } catch (exception) {
        next(exception);
    }
};

export const updateAuthor = async (request, response, next) => {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const existingAuthor = await prisma.author.findUnique({
            where: { id: Number(id) }
        });

        if (!existingAuthor) {
            throw new NotFoundError(`Author with id ${id} not found`);
        }

        const updatedAuthor = await prisma.author.update({
            where: { id: Number(id) },
            data: { name }
        });

        response.status(200).json({
            message: 'Successfully Updated Author',
            data: updatedAuthor
        });

    } catch (exception) {
        next(exception);
    }
};

export const deleteAuthor = async (request, response, next) => {
    try {
        const authorId = request.params?.id;

        const existingAuthor = await prisma.author.findUnique({
            where: { id: Number(authorId) }
        });

        if (!existingAuthor) {
            throw new NotFoundError(`Author with id ${authorId} not found`);
        }

        await prisma.author.delete({
            where: { id: Number(authorId) }
        });

        response.status(200).json({
            message: 'Successfully Deleted'
        });

    } catch (exception) {
        next(exception);
    }
};
