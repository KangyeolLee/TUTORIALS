import './styles';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';

export default class Chart extends Component<State, Props> {
  template() {
    return html`
      <div class="chart-view">
        <div class="circular-chart"></div>
      </div>
    `;
  }
}
