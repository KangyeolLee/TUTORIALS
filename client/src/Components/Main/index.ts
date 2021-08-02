import Component from '@/Core/Component';
import './styles';
import {
  HistoryModelType,
  Props,
  State,
  Today,
  HistoryType,
} from '@/utils/types';
import { asyncSetState, html } from '@/utils/helper';
import HistoryModel from '@/Model/HistoryModel';
import { IHistory } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import HistoryDayCard from '@/Components/HistoryDayCard/index';

interface IMainState extends State {
  historyCards: IHistory[];
  today: Today;
  historyType: HistoryType;
}

export default class Main extends Component<IMainState, Props> {
  historyModel!: HistoryModelType;

  setup() {
    this.historyModel = HistoryModel;
  }

  template() {
    return html`
      <section class="main-history-total">
        <div>전체 내역 <span class="history-total-num"></span>건</div>
        <div class="history-selectors">
          <button class="history-select-btn active" id="history-select-income">
            ${svgIcons.checkSmall}
          </button>
          <span class="text">수입 <span class="income-sum"></span></span>
          <button class="history-select-btn active" id="history-select-expense">
            ${svgIcons.checkSmall}
          </button>
          <span class="text">지출 <span class="expense-sum"></span></span>
        </div>
      </section>
      <ul class="day-card-list"></ul>
    `;
  }

  mounted() {
    const $daycardList = this.$target.querySelector(
      '.day-card-list'
    ) as HTMLUListElement;
    const $totalNum = this.$target.querySelector(
      '.history-total-num'
    ) as HTMLSpanElement;
    const $incomeSum = this.$target.querySelector(
      '.income-sum'
    ) as HTMLSpanElement;
    const $expenseSum = this.$target.querySelector(
      '.expense-sum'
    ) as HTMLSpanElement;

    new HistoryDayCard($daycardList, undefined, {
      $totalNum,
      $incomeSum,
      $expenseSum,
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '#history-select-income',
      this.toggleIncomBtn.bind(this)
    );
    this.addEvent(
      'click',
      '#history-select-expense',
      this.toggleExpenseBtn.bind(this)
    );
  }

  toggleIncomBtn() {
    this.$target
      .querySelector('#history-select-income')
      ?.classList.toggle('active');
    asyncSetState(this.historyModel.toggleType('income'));
  }

  toggleExpenseBtn() {
    this.$target
      .querySelector('#history-select-expense')
      ?.classList.toggle('active');
    asyncSetState(this.historyModel.toggleType('expense'));
  }
}
