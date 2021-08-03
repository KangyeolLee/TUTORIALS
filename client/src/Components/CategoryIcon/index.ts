import './styles';
import { svgIcons } from '@/assets/svgIcons';
import { CategoryType } from '@/utils/types';

const CategoryIcon = (category: CategoryType) => `
<div class="category-icon" id="${category.id}">
  <span class="delete-icon">${svgIcons.delete}</span>
  <span class="icon" style="background-color: ${category.color}"></span>
  <span class="category-type">${category.type}</span>
</div>
`;

export default CategoryIcon;
