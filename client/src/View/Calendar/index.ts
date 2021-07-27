import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';

export default class Calendar extends Component<State, Props> {
  template() {
    console.log('달력 렌더링 시작');
    return html`<div class="main-test">e달력</div>`;
  }

  handleConsole() {
    console.log(1);
  }

  setEvent() {
    console.log('달력 에서 이벤트 등록');
    this.addEvent('click', '.main-test', this.handleConsole);
    console.log('달력 : ', this.eventlisteners);
  }

  setUnmount() {
    this.removeEvent();
  }
}
