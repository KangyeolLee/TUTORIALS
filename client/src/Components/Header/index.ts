import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { $router } from '@/Core/Router';
import { svgIcons } from '@/assets/svgIcons';
import { Props, State } from '@/utils/types';

export default class Header extends Component<State, Props> {
  template() {
    return html`
      <div class="header-wrapper">
        <span class="header-title">우아한 가계부</span>
        <div class="switch">
          <div class="switch btn" id="btn-prev-month">${svgIcons.leftBtn}</div>
          <div class="switch-text">
            <div class="switch-text month">${'7월'}</div>
            <div class="switch-text year">${'2021'}</div>
          </div>
          <div class="switch btn" id="btn-next-month">${svgIcons.rightBtn}</div>
        </div>
        <ul class="menu">
          <li class="menu-list" id="menu-home">${svgIcons.fileText}</li>
          <li class="menu-list" id="menu-main">${svgIcons.fileText}</li>
          <li class="menu-list" id="menu-calendar">${svgIcons.calendar}</li>
          <li class="menu-list" id="menu-chart">${svgIcons.chart}</li>
        </ul>
      </div>
    `;
  }

  mounted() {
    const $home = this.$target.querySelector('#menu-home') as HTMLElement;
    const $main = this.$target.querySelector('#menu-main') as HTMLElement;
    const $calendar = this.$target.querySelector(
      '#menu-calendar'
    ) as HTMLElement;
    const $chart = this.$target.querySelector('#menu-chart') as HTMLElement;

    $home.addEventListener('click', () => $router.push('/home'));
    $main.addEventListener('click', () => $router.push('/main'));
    $calendar.addEventListener('click', () => $router.push('/calendar'));
    $chart.addEventListener('click', () => $router.push('/charts'));
  }
}
