import {
  CalendarState,
  HistoryForDate,
  HistoryTypeForDate,
  Today,
} from '@/utils/types';
import { addComma, html, makeDateForm } from '@/utils/helper';
import { IHistory } from '@/utils/types';

const SEVEN_DAYS = 7;
const SIX_DAYS = 6;
const START_ZERO = 0;
const START_ONE = 1;
const INCOME = 1;
const OUTCOME = 0;

class CalendarController {
  private inititalState: HistoryTypeForDate;

  constructor() {
    this.inititalState = {
      history: {
        income: 0,
        outcome: 0,
        amount: null,
      },
    };
  }

  getTodayDates(today: Today) {
    const { year, month } = today;
    const today_date = new Date().getDate();
    const last_date = new Date(year, month, 0).getDate();
    const first_day = new Date(year, month - 1, 1).getDay();

    return { today_date, last_date, first_day };
  }

  makeCalendar(
    today_date: number,
    last_date: number,
    first_day: number,
    state: CalendarState,
    $target: HTMLElement
  ) {
    const histories = this.filterHistories(state.historyCards!);
    const { year, month } = state.today;
    const $calendar = $target.querySelector(
      '.calendar-tbody'
    ) as HTMLTableElement;
    let $row = $calendar.insertRow();

    for (let i = START_ZERO; i < first_day; i++) {
      $row.insertCell();
    }

    for (let i = START_ONE; i <= last_date; i++) {
      const date = makeDateForm({ year, month, day: i });

      const $cell = $row.insertCell();
      $cell.id = `calendar-date-${i}`;
      if (today_date === i && month === new Date().getMonth() + 1)
        $cell.classList.add('today');

      $cell.innerHTML = this.makeHistoryForDate({
        date: i,
        history: histories[date]?.history,
      });

      if (histories[date]?.history) {
        $cell.classList.add('history-data');
      }

      if (first_day !== SIX_DAYS) {
        first_day++;
      } else {
        first_day -= SIX_DAYS;

        if (i >= 31) break;
        $row = $calendar.insertRow();
      }
    }

    for (let i = first_day; i < SEVEN_DAYS; i++) {
      if (!i) break;
      $row.insertCell();
    }
  }

  private filterHistories(historyCards: IHistory[]) {
    const histories: { [key: string]: HistoryTypeForDate } = {};
    historyCards?.forEach((history) => {
      const { date, type, price } = history;
      const { income, outcome, amount } =
        histories[date]?.history ?? this.inititalState.history;

      if (type === INCOME) {
        histories[date] = {
          history: {
            income: income ? income + price : price,
            outcome,
            amount: amount ? amount + price : price,
          },
        };
      } else if (type === OUTCOME) {
        histories[date] = {
          history: {
            income,
            outcome: outcome ? outcome + price : -price,
            amount: amount ? amount + price : -price,
          },
        };
      }
    });

    return histories;
  }

  private makeHistoryForDate({ date, history }: HistoryForDate) {
    const { income, outcome, amount } = history ?? this.inititalState.history;

    const innerContent =
      amount !== null
        ? html`
            <div class="history">
              ${income
                ? `<div class="income">+${addComma(income + '')}</div>`
                : null}
              ${outcome
                ? `<div class="outcome">${addComma(outcome + '')}</div>`
                : null}
              <div class="amount">${addComma(amount + '')}</div>
            </div>
            <div class="day">${date}</div>
          `
        : html`
            <div class="history"></div>
            <div class="day">${date}</div>
          `;

    return innerContent.outerHTML;
  }
}

export default new CalendarController();
