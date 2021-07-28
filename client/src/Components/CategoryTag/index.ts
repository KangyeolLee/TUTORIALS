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
    const id = category.filter((c) => c.type === type)[0].id;
    return html` <div class="category-tag" data-id="${id}">${type}</div> `;
  }
}
