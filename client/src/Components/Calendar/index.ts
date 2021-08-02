import Component from '@/Core/Component';
import './styles';
import { html, addComma, asyncSetState } from '@/utils/helper';
import {
  Props,
  TodayModelType,
  MainModelType,
  CalendarState,
  CalendarControllerType,
} from '@/utils/types';
import DateModel from '@/Model/DateModel';
import MainModel from '@/Model/MainModel';
import CalendarController from '@/Controller/CalendarController';

export default class Calendar extends Component<CalendarState, Props> {
  todayModel!: TodayModelType;
  mainModel!: MainModelType;
  calendarController!: CalendarControllerType;

  setup() {
    this.todayModel = DateModel;
    this.todayModel.subscribe(this.todayModel.key, this);

    this.mainModel = MainModel;
    this.mainModel.subscribe(this.mainModel.key, this);

    this.calendarController = CalendarController;

    this.$state = {
      today: this.todayModel.today,
      historyCards: this.mainModel.historyCards,
      historyCardForToday: this.mainModel.historyCardForToday,
    };

    asyncSetState(this.mainModel.getHistoryCard(this.$state!.today));
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
      this.mainModel.getTodaysHistoryCard({ ...today, day: +date! })
    );
  }

  setEvent() {
    this.addEvent('click', '.history-data', this.handleClickOnDate.bind(this));
  }

  setUnmount() {
    this.todayModel.unsubscribe(this.todayModel.key, this);
    this.mainModel.unsubscribe(this.mainModel.key, this);
  }
}
