class CategoryRepository {


    constructor(prisma) {
        this.prisma = prisma;
    }
    
    async create(name) {
        return this.prisma.create({ data: {name} });
    }

    
}