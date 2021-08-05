import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import User from '@/Components/User';
import { getUserInfo } from '@/api/user';
import { docgo } from '@/assets';
import Loading from '@/Components/Loading';

interface UserViewState extends State {
  id: number;
  githubUser: string;
}

export default class UserView extends Component<UserViewState, Props> {
  setup() {
    getUserInfo()
      .then((res) => {
        setTimeout(
          () =>
            this.setState({
              id: res.data.user.id,
              githubUser: res.data.user.githubUser,
            }),
          600
        );
      })
      .catch((err) => {
        // TODO 로그인 실패 알림
        console.error(err);
      });
  }

  template() {
    // 로딩 중
    if (!this.$state!.hasOwnProperty('id')) return Loading();

    return html`
      <section class="user-wrapper container">
        <div class="login-box">
          <div class="inner-box">
            <img src="${docgo}" alt="독고배달이" />
            <h1>우아한가계부</h1>
          </div>
          <div class="login-button-area">
            <a href="${process.env.CLIENT_API_BASE}/user/login">
              <button class="github-btn">
                ${svgIcons.github}
                <span>깃허브로 로그인</span>
              </button>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  mounted() {
    if (this.$state!.hasOwnProperty('id') && this.$state!.id !== 1) {
      const $userWrapper = this.$target.querySelector(
        '.user-wrapper'
      ) as HTMLElement;
      new User($userWrapper, { user: this.$state! });
    }
  }
}
