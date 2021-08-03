import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import DonutChart from '@/Components/DonutChart';
import HistoryCategoryCard from './../../Components/HistoryCategoryCard/index';

export default class ChartsView extends Component<State, Props> {
  template() {
    return html`
      <section class="chart-wrapper container">
        <div class="chart-view-area">
          <div class="chart-background">
            <atricle class="chart-view">
              <div class="donut-chart-view"></div>
              <div class="history-category-list-wrapper"></div>
            </atricle>
          </div>
          <div class="chart-background">
            <article class="chart-view">
              <div class="line-chart-view"></div>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  mounted() {
    const $chart = this.$target.querySelector(
      '.donut-chart-view'
    ) as HTMLElement;
    new DonutChart($chart);

    const $historyCategoryList = this.$target.querySelector(
      '.history-category-list-wrapper'
    ) as HTMLElement;
    new HistoryCategoryCard($historyCategoryList);
  }
}
