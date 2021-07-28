import Component from '@/Core/Component';
import './styles';
import { IHistory, Props, State } from '@/utils/types';
import { addComma, html } from '@/utils/helper';
import CategoryTag from '../CategoryTag';

interface IListStates extends State {
  history: IHistory;
}

export default class List extends Component<IListStates, Props> {
  template() {
    const { history } = this.$state!;
    return html`
      <div class="tag-wrapper"></div>
      <div class="history-text">
        <div class="history-content">${history.content}</div>
        <div class="history-payment">${history.payment}</div>
        <div class="history-price">
          ${!history.type ? '-' : ''}${addComma(history.price.toString())}원
        </div>
        <div></div>
      </div>
    `;
  }

  mounted() {
    const { history } = this.$state!;

    const $tag = this.$target.querySelector('.tag-wrapper') as HTMLElement;
    new CategoryTag($tag, { type: history.category });
  }
}
