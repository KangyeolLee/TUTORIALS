import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import User from '@/Components/User';
import { getUserInfo } from '@/api/user';

interface UserViewState extends State {
  id: number;
  githubUser: string;
}

export default class UserView extends Component<UserViewState, Props> {
  setup() {
    getUserInfo()
      .then((res) => {
        this.setState({
          id: res.data.user.id,
          githubUser: res.data.user.githubUser,
        });
      })
      .catch((err) => {
        // TODO 로그인 실패 알림
        console.error(err);
      });
  }

  template() {
    // 로딩 중
    if (!this.$state!.hasOwnProperty('id')) return html`Loading...`;

    return html`
      <section class="user-wrapper container">
        <a href="http://${location.hostname}:3000/api/user/login">
          <button class="github-btn">
            ${svgIcons.github}
            <span>Github로 로그인</span>
          </button>
        </a>
      </section>
    `;
  }

  mounted() {
    if (this.$state!.id !== 1) {
      const $userWrapper = this.$target.querySelector(
        '.user-wrapper'
      ) as HTMLElement;
      new User($userWrapper, { user: this.$state! });
    }
  }
}
