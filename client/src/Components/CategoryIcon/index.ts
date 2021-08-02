import './styles';
import { svgIcons } from '@/assets/svgIcons';
import { html } from '@/utils/helper';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';

interface CategoryIconState extends State {
  id: number;
}

export default class CategoryIcon extends Component<CategoryIconState, Props> {
  setup() {
    this.$state = {
      id: 1,
    };
  }

  template() {
    const { id } = this.$state!;

    return html`
      <div class="category-icon" id="${id}">
        <span class="delete-icon">${svgIcons.delete}</span>
        <span class="icon">${svgIcons.calendar}</span>
        <h2 class="category-type" editable>캘린더</h2>
      </div>
    `;
  }
}
