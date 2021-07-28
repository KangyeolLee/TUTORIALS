import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import Calendar from '@/Components/Calendar';
import { Props, State } from '@/utils/types';

export default class CalendarView extends Component<State, Props> {
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

        <div class="price-bar">
          <div class="in-outcome">
            <span class="price-content">총 수입 ${'1,450,000'}</span>
            <span class="price-content">총 지출 ${'50,000'}</span>
          </div>
          <div class="total">
            <span class="price-content">총계 ${'1,400,000'}</span>
          </div>
        </div>
      </section>
    `;
  }

  mounted() {
    const $calendar = this.$target.querySelector('.calendar') as HTMLElement;
    new Calendar($calendar);
  }
}
