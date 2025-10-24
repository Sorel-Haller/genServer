import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient( {
    log: [ { level: 'query'} ],
});      

export default prisma;