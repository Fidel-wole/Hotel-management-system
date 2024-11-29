import Category from "../../models/category";

export default class RoomCategoryService {
  static async createCategory(data: { name: string; description?: string }) {
    const category = new Category(data);
    await category.save();
    return category;
  }

  static async getCategories() {
    return Category.find();
  }

  static async getCategoryById(id: string) {
    return Category.findById(id);
  }

  static async updateCategory(id: string, name: string, description?: string) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }   
    category.name = name;
    category.description = description;
    await category.save();
    return category;
    }

    static async deleteCategory(id: string) {
        const category = await Category.findOneAndDelete({_id: id});
        return category;
    }

}