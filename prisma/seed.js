// npm install --save-dev @faker-js/faker
import prisma from '../src/config/prisma.config.js';
import { faker } from '@faker-js/faker/locale/en';

const databaseSeeder = async () => {
    const authors = [];
    for (let i = 0; i < 50; i++) {
        const author = await prisma.author.create({
            data: {
                name: faker.person.fullName(),
            }
        });
        authors.push(author);
    }
    for (let i = 0; i < 50; i++) {
        const book = await prisma.book.create({
            data: {
                title: faker.book.title(), // genereerime juhusliku pealkirja
                description: faker.lorem.sentence(), // genereerime juhusliku kirjelduse
                thumbnail_url: faker.image.url(), // genereerime juhusliku raamatu pildi URL
                release_year: new Date(faker.date.anytime()).getFullYear(), // genereerime juhusliku väljaandmise aasta
            }
        })
    }
}

try {    
    await databaseSeeder();
    prisma.$disconnect();
} catch (exception) {
    console.error('Seeding failed:', exception);
    prisma.$disconnect();
    process.exit(1);
} 