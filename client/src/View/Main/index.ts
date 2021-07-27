import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';

export default class Main extends Component<State, Props> {
  template() {
    console.log('메인 렌더링 시작');
    return html`<div class="main-test">메인</div>`;
  }

  handleConsole() {
    console.log(1);
  }

  setEvent() {
    console.log('main 에서 이벤트 등록');
    this.addEvent('click', '.main-test', this.handleConsole.bind(this));
    console.log('main : ', this.eventlisteners);
  }

  setUnmount() {
    this.removeEvent();
  }
}
