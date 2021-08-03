import Component from '@/Core/Component';
import './styles';
import { html, asyncSetState } from '@/utils/helper';
import {
  ChartControllerType,
  HistoryModelType,
  IHistory,
  Props,
  State,
  Today,
  TodayModelType,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import ChartController from '@/Controller/ChartController';
import DateModel from '@/Model/DateModel';

interface IListStates extends State {
  today: Today;
  selectedCategory: string;
  selectedHistoryForCategory: IHistory[];
}

export default class LineChart extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;
  chartController!: ChartControllerType;

  setup() {
    this.classIDF = 'LineChart';

    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);
    this.chartController = ChartController;

    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.$state = {
      selectedHistoryForCategory: [],
      selectedCategory: '',
      today: this.dateModel.today,
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
  }

  template() {
    const { selectedCategory, selectedHistoryForCategory } = this.$state!;
    console.log(selectedCategory, selectedHistoryForCategory);
    return html` <div>안녕하세욥! 라인 차트에용</div> `;
  }

  setUnmount() {
    this.historyModel.unsubscribe(this.historyModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
  }
}
