import Component from '@/Core/Component';
import './styles';
import { Props, State, Today } from '@/utils/types';
import { html } from '@/utils/helper';
import MainModel from '@/Model/MainModel';
import HistoryDayCard from '../HistoryDayCard';
import { IHistory } from '@/utils/types';
import DateModel from '@/Model/DateModel';
import { svgIcons } from '@/assets/svgIcons';

interface IMainState extends State {
  historyCards: IHistory[];
  today: Today;
  historyType: {
    expense: boolean;
    income: boolean;
  };
}

export default class Main extends Component<IMainState, Props> {
  mainModel: any;
  dateModel: any;

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
    console.log(this.$state.today);
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
            ${svgIcons.check}
          </button>
          <span class="text">수입 ${'19999'}</span>
          <button
            class="history-select-btn"
            id="history-select-expense"
            ${expense ? 'active' : ''}
          >
            ${svgIcons.check}
          </button>
          <span class="text">지출 ${'19999'}</span>
        </div>
      </section>
      <ul class="day-card-list"></ul>
    `;
  }

  mounted() {
    const { historyCards, today, historyType } = this.$state!;

    const $daycardList = this.$target.querySelector(
      '.day-card-list'
    ) as HTMLElement;
    const $totalNum = this.$target.querySelector(
      '.history-total-num'
    ) as HTMLSpanElement;

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
    const historyDates = historyList
      .filter((history) => {
        const [year, month, _] = history.date
          .split('-')
          .map((d) => parseInt(d));
        return today.year === year && today.month === month;
      })
      .map((history) => history.date);
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

    // 전체 내역 건수 업데이트
    $totalNum.innerText = historyDates.length.toString();
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

  toggleIncomBtn(e: any) {
    this.mainModel.toggleType('income');
  }

  toggleExpenseBtn(e: any) {
    this.mainModel.toggleType('expense');
  }
}
