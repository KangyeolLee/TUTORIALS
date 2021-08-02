import './styles';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { apiLogout } from '@/api/auth';
import { $router } from '@/Core/Router';

export default class User extends Component<State, Props> {
  template() {
    return html` <button class="user-btn" id="logout-btn">로그아웃</button> `;
  }

  setEvent() {
    this.addEvent('click', '#logout-btn', this.handleLogOut);
  }

  async handleLogOut() {
    const res = await apiLogout();
    $router.push('/main');
  }
}
