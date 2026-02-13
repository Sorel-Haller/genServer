import prisma from "../config/prisma.js";
import { QueryBuilder } from "../utils/QueryBuilder.js";
import NotFoundError from "../utils/NotFoundError.js";
import ValidationError from "../utils/ValidationError.js";

export const index = async (request, response, next) => {
    try {
        const Builder = new QueryBuilder(request.query, {
            defaultSort: 'created_at',
            defaultTake: 50,
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true } }
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [categories, count] = await Promise.all([
            prisma.category.findMany(prismaQuery),
            prisma.category.count({ where: prismaQuery.where })
        ]);

        const meta = Builder.getPaginationMeta(count);

        response.status(200).json({
            message: 'All categories',
            data: categories,
            meta
        });
    } catch (exception) {
        next(exception);
    }
};

export const create = async (request, response, next) => {
    try {
        const { name } = request.body;

        if (!name) {
            throw new ValidationError("Category name is required", {
                field: "name"
            });
        }

        const createdCategory = await prisma.category.create({
            data: { name }
        });

        response.status(201).json({
            message: 'Category created',
            data: createdCategory
        });

    } catch (exception) {
        next(exception);
    }
};

export const update = async (request, response, next) => {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(id) }
        });

        if (!existingCategory) {
            throw new NotFoundError(`Category with id ${id} not found`);
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { name }
        });

        response.status(200).json({
            message: 'Category updated',
            data: updatedCategory
        });

    } catch (exception) {
        next(exception);
    }
};

export const destroy = async (request, response, next) => {
    try {
        const { id } = request.params;

        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(id) }
        });

        if (!existingCategory) {
            throw new NotFoundError(`Category with id ${id} not found`);
        }

        await prisma.category.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            message: 'Category deleted'
        });

    } catch (exception) {
        next(exception);
    }
};
