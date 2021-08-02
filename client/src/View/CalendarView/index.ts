import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import Calendar from '@/Components/Calendar';
import { Props, State, IHistory, HistoryType } from '@/utils/types';
import PriceBar from '@/Components/PriceBar/index';
import HistoryDayCard from '@/Components/HistoryDayCard/index';

interface IMainState extends State {
  historyCards: IHistory[];
  historyType: HistoryType;
}

export default class CalendarView extends Component<IMainState, Props> {
  template() {
    return html`
      <section class="calendar-wrapper container">
        <ul class="weeks-bar">
          <li>일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li>토</li>
        </ul>

        <div class="calendar"></div>
        <div class="price-bar"></div>
        <ul class="history-card-list"></ul>
      </section>
    `;
  }

  mounted() {
    const $calendar = this.$target.querySelector('.calendar') as HTMLElement;
    new Calendar($calendar);

    const $pricebar = this.$target.querySelector('.price-bar') as HTMLElement;
    new PriceBar($pricebar);

    const $daycardList = this.$target.querySelector(
      '.history-card-list'
    ) as HTMLElement;
    new HistoryDayCard($daycardList, undefined, { onlyToday: true });
  }
}
