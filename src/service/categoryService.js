import NotFoundError from "../utils/NotFoundError";

class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    

    async updateCategory(id, name) {
        await this.categoryRepository.update(id, name);
    }

    async delete(id) {
        if(!id) throw new NotFoundError("Category id is required")
        await this.categoryRepository.destroy(id);
    }
}

export default CategoryService;