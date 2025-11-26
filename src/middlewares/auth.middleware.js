import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const authenticate = async (request, response, next) => {
    try {
       const token = request.headers.authorization?.replace('Bearer ', '');
       
       if (!token) {
        return response.status(401).json({
            message: 'Unauthorized: No token provided'
        });
       }
       const payload = jwt.verify(token, process.env.JWT_SECRET);
       const user = await prisma.user.findUnique({ where: { id: payload.id } });

       request.user = {
        id: user.id,
        email: user.email
       };

       next();

    } catch (exception) {
        next(exception);
    }
}