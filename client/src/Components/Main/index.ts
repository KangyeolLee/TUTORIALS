import Component from '@/Core/Component';
import './styles';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import MainModel from '@/Model/MainModel';
import HistoryDayCard from '../HistoryDayCard';
import { IHistory } from '@/utils/types';

interface IMainState extends State {
  historyCards: IHistory[];
}

export default class Main extends Component<IMainState, Props> {
  model: any;

  setup() {
    this.model = MainModel;
    this.model.subscribe(MainModel.key, this);
    this.$state = {
      historyCards: [...this.model.historyCards],
    };
  }

  template() {
    return html` <ul class="day-card-list"></ul> `;
  }

  mounted() {
    const { historyCards } = this.$state!; // '!' 지우고 싶어요...

    const $daycardList = this.$target.querySelector(
      '.day-card-list'
    ) as HTMLElement;

    const historyDates = historyCards.map(
      (history) => history.date
    ) as string[];
    const dates = Array.from(new Set(historyDates));

    dates.forEach((date) => {
      const curDateHistories = historyCards.filter(
        (history) => history.date === date
      );
      const $li = document.createElement('li');
      new HistoryDayCard($li, { curDateHistories });

      $daycardList.appendChild($li);
    });
  }
}
