import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';  // Kasutame bcryptjs, mitte bcrypt
import prisma from '../config/prisma.js';
import dotenv from 'dotenv'
import { QueryBuilder } from '../utils/QueryBuilder.js';
import { request, response } from 'express';


export const getAllAuthors = async (request, response) => {
    try {
        const Builder = new QueryBuilder(request.query, {
            defaultSort: 'created_at',
            defaultTake: 10,
            allowedSorts: ['created_at', 'name'],
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true } }
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
    } catch (error) {
        response.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Kasutaja registreerimine
export const register = async (request, response) => {
    try {
        const { email, password } = request.body;

        // Kontrollime, kas kasutaja on juba olemas
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return response.status(400).json({
                message: 'User already exists'
            });
        }

        // Krüpteerime parooli enne salvestamist
        const hashedPassword = await bcryptjs.hash(password, 12);  // Kasutame bcryptjs

        // Loome uue kasutaja
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        response.status(201);
        
    } catch (exception) {
        // Erroori käsitlemine
        console.error(exception);
        response.status(500).json({
            message: 'Something went wrong during registration',
            error: exception.message
        });
    }
};

// Kasutaja sisselogimine
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFpundError("Incorrect credentials");

        const isPasswordValid = await bcryptjs.compare(password, user.password); // Kasutame bcryptjs
        if (!isPasswordValid) throw new AuthentificationError("Invalid credentials");
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (exception) {
        console.error(exception);
        response.status(500).json({
            message: 'Something went wrong during login',
            error: exception.message
        });
    }
};
