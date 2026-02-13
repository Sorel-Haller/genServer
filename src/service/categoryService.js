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
            this.categoryRepository.getAll(prismaQuery),
            this.categoryRepository.count( prismaQuery ),
        ]);

        console.log(categories)

        const meta = Builder.getPaginationMeta(count);

        return { categories, meta };
    }

    async createCategory(name) {
        return this.categoryRepository.update(name);
    }

    async updateCategory(id, name) {
        return this.categoryRepository.update(id, name);
    }

    async deleteCategory(id) {
        await this.categoryRepository.destroy(id);
    }
}

export default CategoryService;