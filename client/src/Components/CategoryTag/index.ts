import { CategoryType, DELETE_CATEGORY_COLOR } from '@/utils/types';
import './styles';

export default function CategoryTag(category: CategoryType) {
  return `
    <div
      class="category-tag"
      data-id="${category.id}"
      style="background-color: ${
        category.id !== -1 ? category.color : DELETE_CATEGORY_COLOR
      };"
    >
      ${category.type}
    </div>
  `;
}
