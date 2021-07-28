import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import Main from '@/Components/Main';

export default class MainView extends Component<State, Props> {
  template() {
    console.log('메인 렌더링 시작');
    return html`
      <section class="main-wrapper container">
        <ul class="input-bar">
          <li>
            <label for="date">일자</label>
            <input type="text" name="date" />
          </li>
          <li>
            <label for="date">분류</label>
            <input name="date" placeholder="선택하세요" />
          </li>
          <li>
            <label for="date">내용</label>
            <input type="text" name="date" placeholder="입력하세요" />
          </li>
          <li>
            <label for="date">결제수단</label>
            <input name="date" placeholder="선택하세요" />
          </li>
          <li>
            <label for="date">금액</label>
            ${svgIcons.minus}
            <input type="text" name="date" placeholder="선택하세요" />
          </li>
        </ul>

        <div class="main"></div>
      </section>
    `;
  }

  setEvent() {
    const $main = this.$target.querySelector('.main') as HTMLElement;
    new Main($main);
  }

  setUnmount() {
    // 구독 해제
  }
}
