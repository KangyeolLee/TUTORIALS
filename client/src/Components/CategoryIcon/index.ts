import './styles';
import { svgIcons } from '@/assets/svgIcons';

const CategoryIcon = (id: number) => `
<div class="category-icon" id="${id}">
  <span class="delete-icon">${svgIcons.delete}</span>
  <span class="icon">${svgIcons.calendar}</span>
  <span class="category-type">캘린더</span>
</div>
`;

export default CategoryIcon;
