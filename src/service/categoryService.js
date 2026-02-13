import NotFoundError from "../utils/NotFoundError";
import { QueryBuilder } from "../utils/QueryBuilder.js";

class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getCategory(queryParams) {
        const Builder = new QueryBuilder(queryParams, {
            defaultSort: 'created_at',
            defaultTake: 50,
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true } }
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [categories, count] = await Promise.all([
            prisma.category.getAll(prismaQuery),
            prisma.category.count( prismaQuery ),
        ]);

        const meta = Builder.getPaginationMeta(count);

        return { data: categories, meta };
    }

    async createCategory(name) {
        if(!name) throw new NotFoundError("Category name is required")
        await this.categoryRepository.update(name);
    }

    async updateCategory(id, name) {
        await this.categoryRepository.update(id, name);
    }

    async deleteCategory(id) {
        if(!id) throw new NotFoundError("Category id is required")
        await this.categoryRepository.destroy(id);
    }
}

export default CategoryService;