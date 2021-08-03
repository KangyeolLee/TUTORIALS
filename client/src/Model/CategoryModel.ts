import { createCategory, deleteCategory, getCategories } from '@/api/category';
import Observable from '@/Core/Observable';
import { CategoryType } from '@/utils/types';

class CategoryModel extends Observable {
  key: string = 'category';
  categoryList: CategoryType[];

  constructor() {
    super();
    this.categoryList = [];
  }

  async getUserCategories() {
    const res = await getCategories();
    this.categoryList = res.data.categories;
    return this.notify(this.key, {
      categoryList: this.categoryList,
    });
  }

  async deleteUserCategories(id: number) {
    const res = await deleteCategory(id);
    this.categoryList = this.categoryList.filter(
      (category) => category.id !== id
    );
    return this.notify(this.key, {
      categoryList: this.categoryList,
    });
  }

  async createUserCategories(type: string, color: string) {
    const res = await createCategory({ type, color });
    this.categoryList = [
      ...this.categoryList,
      {
        type,
        color,
        id: res.data.insertId,
      },
    ];
    return this.notify(this.key, {
      categoryList: this.categoryList,
    });
  }
}

export default new CategoryModel();
