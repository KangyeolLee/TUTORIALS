import './styles';
import { category } from '@/assets/dummy';

export default function CategoryTag(categoryType: string) {
  const type = categoryType;
  const isExisting = category.filter((c) => c.type === type)[0];
  return `
    <div
      class="category-tag"
      data-id="${isExisting ? isExisting.id : category[6].id}"
    >
      ${isExisting ? isExisting.type : category[6].type}
    </div>
  `;
}
