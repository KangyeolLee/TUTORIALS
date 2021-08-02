import './styles';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { apiLogout } from '@/api/auth';
import { $router } from '@/Core/Router';
import CategoryIcon from '@/Components/CategoryIcon';

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
        <section class="content-box user-payments">
          <section class="content-box-title user-category-title">
            <span class="title">카테고리</span>
            <span class="edit-button">편집</span>
          </section>
          <ul class="user-payments-icons"></ul>
        </section>
      </div>
    `;
  }

  mounted() {
    const $userPaymentsIcons = this.$target.querySelector(
      '.user-payments-icons'
    ) as HTMLElement;

    for (let i = 0; i < 8; i++) {
      const $li = document.createElement('li');
      new CategoryIcon($li);
      $userPaymentsIcons.appendChild($li);
    }
  }

  setEvent() {
    this.addEvent('click', '.logout-btn', this.handleLogOut);
  }

  async handleLogOut() {
    const res = await apiLogout();
    $router.push('/main');
  }
}
