import Component from '@/Core/Component';
import './styles';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { category } from '@/assets/dummy';

interface ICategoryTagStates extends State {
  type: string;
}

export default class CategoryTag extends Component<ICategoryTagStates, Props> {
  template() {
    const { type } = this.$state!;
    const isExisting = category.filter((c) => c.type === type)[0];
    return html`
      <div
        class="category-tag"
        data-id="${isExisting ? isExisting.id : category[6].id}"
      >
        ${isExisting ? isExisting.type : category[6].type}
      </div>
    `;
  }
  removeEvent() {}
}
