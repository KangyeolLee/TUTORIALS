import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import Chart from '@/Components/Chart';

export default class ChartsView extends Component<State, Props> {
  template() {
    return html`
      <section class="chart-wrapper container">
        <div class="chart-background">
          <atricle class="chart"></atricle>
          <atricle class="chart-history-list">
            <h1 class="list-title">이번 달 지출 금액</h1>
            <ul class="chart-list">
              <li class="history-list">
                <div class="category-tag" data-id="${7}">${'생활'}</div>
                <div class="history-text">
                  <div class="history-content">${'68%'}</div>
                  <div></div>
                  <div class="history-price">${'100,900원'}</div>
                <div>
              </li>
              <li class="history-list">
                <div class="category-tag" data-id="${1}">${'의료/건강'}</div>
                <div class="history-text">
                  <div class="history-content">${'15%'}</div>
                  <div></div>
                  <div class="history-price">${'50,900원'}</div>
                <div>
              </li>
              <li class="history-list">
                <div class="category-tag" data-id="${2}">${'쇼핑/문화'}</div>
                <div class="history-text">
                  <div class="history-content">${'8%'}</div>
                  <div></div>
                  <div class="history-price">${'40,900원'}</div>
                <div>
              </li>
              <li class="history-list">
                <div class="category-tag" data-id="${3}">${'식비'}</div>
                <div class="history-text">
                  <div class="history-content">${'8%'}</div>
                  <div></div>
                  <div class="history-price">${'30,900원'}</div>
                <div>
              </li>
              <li class="history-list">
                <div class="category-tag" data-id="${4}">${'교통'}</div>
                <div class="history-text">
                  <div class="history-content">${'7%'}</div>
                  <div></div>
                  <div class="history-price">${'20,900원'}</div>
                <div>
              </li>
            </ul>
          </atricle>
        </div>
      </section>
    `;
  }

  mounted() {
    const $chart = this.$target.querySelector('.chart') as HTMLElement;
    new Chart($chart);
  }
}
