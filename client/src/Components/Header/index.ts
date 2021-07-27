import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { $router } from '@/Core/Router';
import { svgIcons } from '@/assets/svgIcons';
import { Props, State } from '@/utils/types';

export default class Header extends Component<State, Props> {
  template() {
    return html`
      <div>
        헤더입니당
        <button class="home">홈${svgIcons.fileText}</button>
        <button class="main">메인${svgIcons.fileText}</button>
        <button class="calendar">달력 ${svgIcons.calendar}</button>
        <button class="chart">차트 ${svgIcons.chart}</button>
      </div>
    `;
  }

  mounted() {
    const $home = this.$target.querySelector('.home') as HTMLElement;
    const $main = this.$target.querySelector('.main') as HTMLElement;
    const $calendar = this.$target.querySelector('.calendar') as HTMLElement;
    const $chart = this.$target.querySelector('.chart') as HTMLElement;

    $home.addEventListener('click', () => $router.push('/home'));
    $main.addEventListener('click', () => $router.push('/main'));
    $calendar.addEventListener('click', () => $router.push('/calendar'));
    $chart.addEventListener('click', () => $router.push('/charts'));
  }
}
