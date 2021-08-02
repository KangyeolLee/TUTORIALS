import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import Main from '@/Components/Main';
import InputBar from '@/Components/InputBar/index';

export default class MainView extends Component<State, Props> {
  template() {
    return html`
      <section class="main-wrapper container">
        <div class="input-bar-wrapper"></div>
        <div class="main"></div>
      </section>
    `;
  }

  mounted() {
    const $inputBar = this.$target.querySelector(
      '.input-bar-wrapper'
    ) as HTMLElement;
    new InputBar($inputBar);

    const $main = this.$target.querySelector('.main') as HTMLElement;
    new Main($main);
  }
}
