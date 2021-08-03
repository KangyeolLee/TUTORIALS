import './styles';
import Component from '@/Core/Component';
import { CategoryType, Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { apiLogout } from '@/api/auth';
import { $router } from '@/Core/Router';
import UserCategory from '../UserCategory';
import UserPayment from '../UserPayment';

interface UserState extends State {
  user: {
    id: number;
    githubUser: string;
  };
}

export default class User extends Component<UserState, Props> {
  template() {
    return html`
      <div class="user">
        <section class="content-box user-info">
          <span class="github-user">${this.$state!.user.githubUser}</span>
          <button class="logout-btn">로그아웃</button>
        </section>
        <section class="user-boxes">
          <section class="content-box user-categories"></section>
          <section class="content-box user-payments"></section>
        </section>
      </div>
    `;
  }

  mounted() {
    console.log('user mounted', this.$state);
    const $categoryBox = this.$target.querySelector(
      '.user-categories'
    ) as HTMLElement;
    new UserCategory($categoryBox);
    const $paymentBox = this.$target.querySelector(
      '.user-payments'
    ) as HTMLElement;
    new UserPayment($paymentBox);
  }

  setEvent() {
    this.addEvent('click', '.logout-btn', this.handleLogOut);
  }

  async handleLogOut() {
    const res = await apiLogout();
    $router.push('/main');
  }
}
