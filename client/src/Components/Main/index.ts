import Component from '@/Core/Component';
import './styles';
import {
  MainModelType,
  Props,
  State,
  Today,
  TodayModelType,
  HistoryType,
} from '@/utils/types';
import { addComma, asyncSetState, html } from '@/utils/helper';
import MainModel from '@/Model/MainModel';
import HistoryDayCard from '../HistoryDayCard';
import { IHistory } from '@/utils/types';
import DateModel from '@/Model/DateModel';
import { svgIcons } from '@/assets/svgIcons';

interface IMainState extends State {
  historyCards: IHistory[];
  today: Today;
  historyType: HistoryType;
}

export default class Main extends Component<IMainState, Props> {
  mainModel!: MainModelType;
  dateModel!: TodayModelType;

  setup() {
    // main 모델(history) 구독
    this.mainModel = MainModel;
    this.mainModel.subscribe(this.mainModel.key, this);
    // date 모델 구독
    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.$state = {
      historyCards: this.mainModel.historyCards,
      today: this.dateModel.today,
      historyType: this.mainModel.historyType,
    };

    asyncSetState(this.mainModel.getHistoryCard(this.$state!.today));
  }

  template() {
    const { expense, income } = this.$state!.historyType;

    return html`
      <section class="main-history-total">
        <div>전체 내역 <span class="history-total-num"></span>건</div>
        <div class="history-selectors">
          <button
            class="history-select-btn"
            id="history-select-income"
            ${income ? 'active' : ''}
          >
            ${svgIcons.checkSmall}
          </button>
          <span class="text">수입 <span class="income-sum"></span></span>
          <button
            class="history-select-btn"
            id="history-select-expense"
            ${expense ? 'active' : ''}
          >
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

    // 리스트 업데이트
    const historyDates = this.updateList($daycardList);
    // 전체 내역 건수 업데이트
    $totalNum.innerText = historyDates.length.toString();

    const incomeSum = this.$state?.historyCards
      .filter((history) => history.type === 1)
      .reduce((acc, cur, i) => acc + cur.price, 0);
    const expenseSum = this.$state?.historyCards
      .filter((history) => history.type === 0)
      .reduce((acc, cur, i) => acc + cur.price, 0);

    $incomeSum.innerText = addComma(incomeSum!.toString());
    $expenseSum.innerText = addComma(expenseSum!.toString());
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

  setUnmount() {
    this.mainModel.unsubscribe(this.mainModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
  }

  updateList($daycardList: HTMLUListElement) {
    const { historyCards, today, historyType } = this.$state!;

    // 수입/지출 선택에 따른 historyList 추출
    const historyList = historyCards.filter((history) => {
      if (historyType.expense && historyType.income) return true;
      else if (historyType.expense && !historyType.income)
        return history.type === 0;
      else if (!historyType.expense && historyType.income)
        return history.type === 1;
      else return false;
    });

    // 해당 월의 history 추출
    const historyDates = historyList.map((history) => history.date);
    // 카드를 생성할 날짜를 중복 제거한 후 배열로 저장
    const dates = Array.from(new Set(historyDates)).sort().reverse();

    dates.forEach((date) => {
      const curDateHistories = historyList.filter(
        (history) => history.date === date
      );
      const $li = document.createElement('li');
      new HistoryDayCard($li, { curDateHistories });
      $daycardList.appendChild($li);
    });

    return historyDates;
  }

  toggleIncomBtn(e: any) {
    asyncSetState(this.mainModel.toggleType('income'));
  }

  toggleExpenseBtn(e: any) {
    asyncSetState(this.mainModel.toggleType('expense'));
  }
}
