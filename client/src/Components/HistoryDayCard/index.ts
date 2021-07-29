import Component from '@/Core/Component';
import './styles';
import { IHistory, Props, State } from '@/utils/types';
import { addComma, html } from '@/utils/helper';
import List from '../List';

interface IHistoryDayCardStates extends State {
  curDateHistories: IHistory[];
}

export default class HistoryDayCard extends Component<
  IHistoryDayCardStates,
  Props
> {
  template() {
    const date = this.$state!.curDateHistories[0].date;
    const [_, month, day]: number[] = date.split('-').map((s) => parseInt(s));
    const dayOfWeek = this.getDayOfWeek(date);
    const expenseTotal = this.getExpenseTotal();
    const incomeTotal = this.getIncomeTotal();

    return html`
      <section class="history-day-card">
        <div class="history-date">
          <div class="date">${month}월 ${day}일 ${dayOfWeek}</div>
          <div class="total">
            ${incomeTotal ? '수입 ' + addComma(incomeTotal.toString()) : ''}
            ${expenseTotal ? '지출 ' + addComma(expenseTotal.toString()) : ''}
          </div>
        </div>
        <ul class="history-list"></ul>
      </section>
    `;
  }

  mounted() {
    const $historyList = this.$target.querySelector('.history-list');

    this.$state?.curDateHistories.forEach((history) => {
      const $li = document.createElement('li');
      $li.className = 'history-list-item';
      new List($li, { history });
      $historyList?.appendChild($li);
    });
  }

  getDayOfWeek(date: string) {
    return ['일', '월', '화', '수', '목', '금', '토'][new Date(date).getDay()];
  }

  getExpenseTotal() {
    return this.$state?.curDateHistories
      .filter((history) => history.type === 0)
      .reduce((acc, cur, i) => {
        return acc + cur.price;
      }, 0);
  }

  getIncomeTotal() {
    return this.$state?.curDateHistories
      .filter((history) => history.type === 1)
      .reduce((acc, cur, i) => {
        return acc + cur.price;
      }, 0);
  }

  removeEvent() {}
}
