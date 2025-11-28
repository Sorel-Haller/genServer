import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';  // Kasutame bcryptjs, mitte bcrypt
import prisma from '../config/prisma.js';
import dotenv from 'dotenv'

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

        response.status(201).json({
            message: 'User registered successfully'
        });
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

        // Kontrollime, kas kasutaja on olemas
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return response.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Kontrollime, kas parool on õige
        const isPasswordValid = await bcryptjs.compare(password, user.password); // Kasutame bcryptjs

        if (!isPasswordValid) {
            return response.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Loome JWT tokeni
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (exception) {
        // Erroori käsitlemine
        console.error(exception);
        response.status(500).json({
            message: 'Something went wrong during login',
            error: exception.message
        });
    }
};
