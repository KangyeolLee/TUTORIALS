import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import DonutChart from '@/Components/DonutChart';
import HistoryCategoryCard from '@/Components/HistoryCategoryCard/index';
import LineChart from '@/Components/LineChart/index';

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
    const $donutChart = this.$target.querySelector(
      '.donut-chart-view'
    ) as HTMLElement;
    new DonutChart($donutChart);

    const $lineChart = this.$target.querySelector(
      '.line-chart-view'
    ) as HTMLElement;
    new LineChart($lineChart);

    const $historyCategoryList = this.$target.querySelector(
      '.history-category-list-wrapper'
    ) as HTMLElement;
    new HistoryCategoryCard($historyCategoryList);
  }
}
