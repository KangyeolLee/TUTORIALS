import { deleteCategory, getCategories } from '@/api/category';
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
    const nextCategoryList = res.data.categories;
    this.categoryList = nextCategoryList;
    return this.notify(this.key, {
      categoryList: nextCategoryList,
    });
  }

  async deleteUserCategories(id: number) {
    const res = await deleteCategory(id);
    const nextCategoryList = this.categoryList.filter(
      (category) => category.id !== id
    );
    return this.notify(this.key, {
      categoryList: nextCategoryList,
    });
  }
}

export default new CategoryModel();
