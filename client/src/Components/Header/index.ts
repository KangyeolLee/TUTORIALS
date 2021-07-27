import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { $router } from '@/Core/Router';
import { svgIcons } from '@/assets/svgIcons';

export default class Header extends Component {
  template() {
    return html`
      <div class="header-wrapper container">
        <span class="header-title">우아한 가계부</span>
        <div class="switch">
          <div class="switch btn" id="btn-prev-month">${svgIcons.leftBtn}</div>
          <div class="switch-text">
            <div class="switch-text month">${'7월'}</div>
            <div class="switch-text year">${'2021'}</div>
          </div>
          <div class="switch btn" id="btn-next-month">${svgIcons.rightBtn}</div>
        </div>
        <li class="menu">
          <ul class="menu-list" id="menu-main">
            ${svgIcons.fileText}
          </ul>
          <ul class="menu-list" id="menu-calendar">
            ${svgIcons.calendar}
          </ul>
          <ul class="menu-list" id="menu-chart">
            ${svgIcons.chart}
          </ul>
        </li>
      </div>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector('#menu-main') as HTMLElement;
    const $calendar = this.$target.querySelector(
      '#menu-calendar'
    ) as HTMLElement;
    const $chart = this.$target.querySelector('#menu-chart') as HTMLElement;

    $main.addEventListener('click', () => $router.push('/main'));
    $calendar.addEventListener('click', () => $router.push('/calendar'));
    $chart.addEventListener('click', () => $router.push('/charts'));
  }
}
