import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';

export default class UserView extends Component<State, Props> {
  template() {
    return html`
      <section class="user-wrapper container">
        <button class="login-btn">
          ${svgIcons.github}
          <span>Github로 로그인</span>
        </button>
      </section>
    `;
  }
}
