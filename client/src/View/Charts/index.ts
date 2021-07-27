import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';

export default class Charts extends Component<State, Props> {
  template() {
    console.log('차트 렌더링 시작');
    return html`<div>차트다</div>`;
  }

  mounted() {
    console.log(this.eventlisteners);
  }
}
