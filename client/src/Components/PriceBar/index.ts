import './styles';
import Component from '@/Core/Component';
import { Props, State, HistoryModelType } from '@/utils/types';
import { html, addComma } from '@/utils/helper';
import HistoryModel from '@/Model/HistoryModel';

export default class PriceBar extends Component<State, Props> {
  model!: HistoryModelType;

  setup() {
    this.classIDF = 'PriceBar';
    this.model = HistoryModel;
    this.model.subscribe(this.model.key, this);
  }

  template() {
    const { amount, income, outcome } = this.model.filterHistoryPriceAmount();
    return html`
      <div class="in-outcome">
        <span class="price-content income"
          >총 수입 ${addComma(income + '')}</span
        >
        <span class="price-content outcome"
          >총 지출 ${addComma(outcome + '')}</span
        >
      </div>
      <div class="total">
        <span class="price-content">총계 ${addComma(amount + '')}</span>
      </div>
    `;
  }

  setUnmount() {
    this.model.unsubscribe(this.model.key, this);
  }
}
