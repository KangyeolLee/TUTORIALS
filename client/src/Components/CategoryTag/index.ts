import { CategoryType } from '@/utils/types';
import './styles';

export default function CategoryTag(category: CategoryType) {
  return `
    <div
      class="category-tag"
      data-id="${category.id}"
      style="background-color: ${
        category.id !== -1 ? category.color : '#d2d2d2'
      };"
    >
      ${category.type}
    </div>
  `;
}
