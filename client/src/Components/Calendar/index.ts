import Component from '@/Core/Component';
import './styles';
import { html } from '@/utils/helper';
import { Props, State, TodayModel, DateState } from '@/utils/types';
import DateModel from '@/Model/DateModel';

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

export default class Calendar extends Component<DateState, Props> {
  model!: TodayModel;

  setup() {
    this.model = DateModel;
    this.model.subscribe(this.model.key, this);
    this.$state = {
      today: this.model.today,
    };
  }
  template() {
    const a = 0;
    console.log(this.$state?.today);
    return html`
      <table class="calendar-table">
        <tbody class="calendar-tbody"></tbody>
      </table>
    `;
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
              ${income ? `<div class="income">${income}</div>` : null}
              ${outcome ? `<div class="outcome">-${outcome}</div>` : null}
              <div class="amount">${amount}</div>
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
    const { month } = this.$state!.today;
    const $calendar = this.$target.querySelector(
      '.calendar-tbody'
    ) as HTMLTableElement;
    let $row = $calendar.insertRow();

    for (let i = START_ZERO; i < first_day; i++) {
      $row.insertCell();
    }

    for (let i = START_ONE; i <= last_date; i++) {
      if (first_day !== SEVEN_DAYS) {
        const $cell = $row.insertCell();
        $cell.id = `calendar-date-${i}`;
        // 이런 부분들 모두 재정리 할 예정~~ 입니다
        if (today_date === i && month === new Date().getMonth() + 1)
          $cell.classList.add('today');
        $cell.innerHTML = this.makeHistoryForDate({
          date: i,
          history: { amount: null },
        });
        first_day++;
      } else {
        $row = $calendar.insertRow();
        const $cell = $row.insertCell();
        $cell.id = `calendar-date-${i}`;
        if (today_date === i && month === new Date().getMonth() + 1)
          $cell.classList.add('today');
        // 더미데이터 : 추후 삭제 예정
        const history =
          i === 4
            ? {
                income: 1850000,
                outcome: 450000,
                amount: 1400000,
              }
            : { amount: null };
        $cell.innerHTML = this.makeHistoryForDate({
          date: i,
          history,
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
    console.log(last_date, first_day);
  }

  setUnmount() {
    this.model.unsubscribe(this.model.key, this);
  }
}
