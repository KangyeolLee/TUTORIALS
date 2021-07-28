import Component from '@/Core/Component';
import './styles';
import { Props, State, Today } from '@/utils/types';
import { html } from '@/utils/helper';
import MainModel from '@/Model/MainModel';
import HistoryDayCard from '../HistoryDayCard';
import { IHistory } from '@/utils/types';
import DateModel from '@/Model/DateModel';

interface IMainState extends State {
  historyCards: IHistory[];
  today: Today;
}

export default class Main extends Component<IMainState, Props> {
  mainModel: any;
  dateModel: any;

  setup() {
    // main 모델(history) 구독
    this.mainModel = MainModel;
    // date 모델 구독
    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.$state = {
      historyCards: this.mainModel.historyCards,
      today: this.dateModel.today,
    };
    console.log(this.$state.today);
  }

  template() {
    return html` <ul class="day-card-list"></ul> `;
  }

  mounted() {
    const { historyCards, today } = this.$state!;

    const $daycardList = this.$target.querySelector(
      '.day-card-list'
    ) as HTMLElement;

    const historyDates = historyCards
      .filter((history) => {
        const [year, month, _] = history.date
          .split('-')
          .map((d) => parseInt(d));
        return today.year === year && today.month === month;
      })
      .map((history) => history.date) as string[];
    const dates = Array.from(new Set(historyDates)).sort().reverse();

    dates.forEach((date) => {
      const curDateHistories = historyCards.filter(
        (history) => history.date === date
      );
      const $li = document.createElement('li');
      new HistoryDayCard($li, { curDateHistories });

      $daycardList.appendChild($li);
    });
  }

  setUnmount() {
    this.mainModel.unsubscribe(this.mainModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
  }
}
