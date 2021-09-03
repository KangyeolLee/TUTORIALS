import Component from '@/Core/Component';
import './styles';
import { html, asyncSetState } from '@/utils/helper';
import {
  Props,
  TodayModelType,
  HistoryModelType,
  CalendarState,
  CalendarControllerType,
} from '@/utils/types';
import DateModel from '@/Model/DateModel';
import HistoryModel from '@/Model/HistoryModel';
import CalendarController from '@/Controller/CalendarController';

export default class Calendar extends Component<CalendarState, Props> {
  todayModel!: TodayModelType;
  historyModel!: HistoryModelType;
  calendarController!: CalendarControllerType;

  setup() {
    this.todayModel = DateModel;
    this.todayModel.subscribe(this.todayModel.key, this);

    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);

    this.calendarController = CalendarController;

    this.$state = {
      today: this.todayModel.today,
      historyCards: this.historyModel.historyCards,
      historyCardForToday: this.historyModel.historyCardForToday,
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state!.today));
  }

  template() {
    return html`
      <table class="calendar-table">
        <tbody class="calendar-tbody"></tbody>
      </table>
    `;
  }

  mounted() {
    const { today } = this.$state!;
    const { today_date, last_date, first_day } =
      this.calendarController.getTodayDates(today);

    this.calendarController.makeCalendar(
      today_date,
      last_date,
      first_day,
      this.$state!,
      this.$target
    );
  }

  handleClickOnDate(e: MouseEvent) {
    const { today } = this.$state!;

    const regex = /\d{1,2}/;
    const tid = (<HTMLElement>e.target).closest('.history-data')?.id;
    const date = tid?.match(regex)?.[0];
    asyncSetState(
      this.historyModel.getTodaysHistoryCard({ ...today, day: +date! })
    );
  }

  setEvent() {
    this.addEvent('click', '.history-data', this.handleClickOnDate.bind(this));
  }

  setUnmount() {
    this.todayModel.unsubscribe(this.todayModel.key, this);
    this.historyModel.unsubscribe(this.historyModel.key, this);
  }
}
