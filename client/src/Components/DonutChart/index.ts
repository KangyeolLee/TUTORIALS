import './styles';
import Component from '@/Core/Component';
import {
  CategoryModelType,
  CategoryType,
  ChartControllerType,
  HistoryModelType,
  IHistory,
  Props,
  State,
  Today,
  TodayModelType,
} from '@/utils/types';
import { asyncSetState, html } from '@/utils/helper';
import ChartController from '@/Controller/ChartController';
import HistoryModel from '@/Model/HistoryModel';
import DateModel from '@/Model/DateModel';
import CategoryModel from '@/Model/CategoryModel';

const data = [
  {
    percent: 15,
    color: '#80e080',
  },
  {
    percent: 35,
    color: '#4fc3f7',
  },
  {
    percent: 20,
    color: '#9575cd',
  },
  {
    percent: 30,
    color: '#f06292',
  },
];

interface IListStates extends State {
  historyCards: IHistory[];
  today: Today;
  selectedType: number;
  categoryList: CategoryType[];
}

export default class DonutChart extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;
  chartController!: ChartControllerType;
  categoryModel!: CategoryModelType;

  setup() {
    this.classIDF = 'DonutChart';

    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);
    this.chartController = ChartController;

    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.categoryModel = CategoryModel;
    this.categoryModel.subscribe(this.categoryModel.key, this);

    this.$state = {
      historyCards: this.historyModel.historyCards,
      today: this.dateModel.today,
      selectedType: this.historyModel.selectedType,
      categoryList: this.categoryModel.categoryList,
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
    asyncSetState(this.categoryModel.getUserCategories());
  }

  template() {
    return html`
      <svg
        id="donut-chart"
        width="100%"
        height="100%"
        xmlns="http://w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
      >
        <text y="50%" transform="translate(0, 2)" font-family: "Arial, Helvetica, sans-serif">
          <tspan
            x="50%"
            text-anchor="middle"
            class="svg-text ${this.$state?.selectedType ? 'income' : 'outcome'}"
          >
            ${this.$state?.selectedType ? '수입' : '지출'}
          </tspan>
        </text>
      </svg>
    `;
  }

  mounted() {
    const { historyCards, selectedType, categoryList } = this.$state!;
    const { categoryCards, categories } =
      this.chartController.filterHistoryCardByCategory(
        historyCards,
        selectedType
      );

    const $svg = document.querySelector('svg#donut-chart') as HTMLElement;
    this.chartController.makeDonutChart(
      categories,
      categoryCards,
      $svg,
      categoryList
    );
  }

  setUnmount() {
    this.historyModel.unsubscribe(this.historyModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
    this.categoryModel.unsubscribe(this.categoryModel.key, this);
  }
}
