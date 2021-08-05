import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import Main from '@/Components/Main';
import InputBar from '@/Components/InputBar';
import Alert from '@/Components/Alerrt';

export default class MainView extends Component<State, Props> {
  template() {
    return html`
      <section class="main-wrapper container">
        <div class="input-bar-wrapper"></div>
        <div class="main"></div>
      </section>
      <div class="alert"></div>
    `;
  }

  mounted() {
    const $inputBar = this.$target.querySelector(
      '.input-bar-wrapper'
    ) as HTMLElement;
    new InputBar($inputBar);

    const $main = this.$target.querySelector('.main') as HTMLElement;
    new Main($main);

    const $alert = this.$target.querySelector('.alert') as HTMLElement;
    new Alert($alert);
  }
}
