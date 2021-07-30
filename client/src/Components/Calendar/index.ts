import Component from '@/Core/Component';
import './styles';
import { html, addComma } from '@/utils/helper';
import {
  Props,
  TodayModelType,
  MainModelType,
  CalendarState,
  HistoryType,
} from '@/utils/types';
import DateModel from '@/Model/DateModel';
import MainModel from '@/Model/MainModel';

const SEVEN_DAYS = 7;
const SIX_DAYS = 6;
const START_ZERO = 0;
const START_ONE = 1;

type HistoryForDate = {
  date: number;
  history?: {
    income?: number;
    outcome?: number;
    amount: number | null;
  };
};

type HistoryTypeForDate = {
  history: {
    income?: number;
    outcome?: number;
    amount: number | null;
  };
};

export default class Calendar extends Component<CalendarState, Props> {
  todayModel!: TodayModelType;
  mainModel!: MainModelType;

  setup() {
    this.todayModel = DateModel;
    this.todayModel.subscribe(this.todayModel.key, this);

    this.mainModel = MainModel;
    this.mainModel.subscribe(this.mainModel.key, this);

    this.$state = {
      today: this.todayModel.today,
      historyCards: this.mainModel.historyCards,
      historyType: this.mainModel.historyType,
      histories: {},
    };

    this.mainModel.getHistoryCard(this.$state!.today);

    console.log(this.$state);
  }

  template() {
    return html`
      <table class="calendar-table">
        <tbody class="calendar-tbody"></tbody>
      </table>
    `;
  }

  /**
   * histories[i] = {
   *    income: ...,
   *    outcome: ...,
   *    amount: ...,
   * }
   */
  filterHistories() {
    const { historyCards, histories } = this.$state!;
    historyCards?.forEach((history) => {
      const { date, type, price } = history;
      const { income, outcome, amount } = histories?.[date]?.history ?? {
        income: undefined,
        outcome: undefined,
        amount: null,
      };

      if (type) {
        histories[date] = {
          history: {
            income: income ? income + price : price,
            outcome,
            amount: amount ? amount + price : price,
          },
        };
      } else if (type === 0) {
        histories[date] = {
          history: {
            income,
            outcome: outcome ? outcome + price : price,
            amount: amount ? amount + price : price,
          },
        };
      }
    });
  }

  getTodayDates() {
    const { year, month } = this.$state!.today;
    const today_date = new Date().getDate();
    const last_date = new Date(year, month, 0).getDate();
    const first_day = new Date(year, month - 1, 1).getDay();

    return { today_date, last_date, first_day };
  }

  makeHistoryForDate({ date, history }: HistoryForDate) {
    const { income, outcome, amount } = history ?? {
      amount: null,
    };

    const innerContent =
      amount !== null
        ? html`
            <div class="history">
              ${income
                ? `<div class="income">${addComma(income + '')}</div>`
                : null}
              ${outcome
                ? `<div class="outcome">-${addComma(outcome + '')}</div>`
                : null}
              <div class="amount">${addComma(amount + '')}</div>
            </div>
            <div class="day">${date}</div>
          `
        : html`
            <div class="history"></div>
            <div class="day">${date}</div>
          `;

    return innerContent;
  }

  // 데이터 연동이 되는 시점에서 내부 로직을 조금 분리할 계획입니다..!
  makeCalendar(today_date: number, last_date: number, first_day: number) {
    this.filterHistories();
    const { year, month } = this.$state!.today;
    const $calendar = this.$target.querySelector(
      '.calendar-tbody'
    ) as HTMLTableElement;
    let $row = $calendar.insertRow();

    for (let i = START_ZERO; i < first_day; i++) {
      $row.insertCell();
    }

    for (let i = START_ONE; i <= last_date; i++) {
      const date =
        year +
        '-' +
        (month > 9 ? month : '0' + month) +
        '-' +
        (i > 9 ? i : '0' + i);
      if (first_day !== SEVEN_DAYS) {
        const $cell = $row.insertCell();
        $cell.id = `calendar-date-${i}`;
        // 이런 부분들 모두 재정리 할 예정~~ 입니다
        if (today_date === i && month === new Date().getMonth() + 1)
          $cell.classList.add('today');
        $cell.innerHTML = this.makeHistoryForDate({
          date: i,
          history: this.$state?.histories[date]?.history ?? { amount: null },
        });
        first_day++;
      } else {
        $row = $calendar.insertRow();
        const $cell = $row.insertCell();
        $cell.id = `calendar-date-${i}`;
        if (today_date === i && month === new Date().getMonth() + 1)
          $cell.classList.add('today');
        // 더미데이터 : 추후 삭제 예정
        $cell.innerHTML = this.makeHistoryForDate({
          date: i,
          history: this.$state?.histories[date]?.history ?? { amount: null },
        });
        first_day -= SIX_DAYS;
      }
    }

    for (let i = first_day; i < SEVEN_DAYS; i++) {
      $row.insertCell();
    }
  }

  mounted() {
    const { today_date, last_date, first_day } = this.getTodayDates();

    this.makeCalendar(today_date, last_date, first_day);
  }

  setUnmount() {
    this.todayModel.unsubscribe(this.todayModel.key, this);
    this.mainModel.unsubscribe(this.mainModel.key, this);
  }
}
