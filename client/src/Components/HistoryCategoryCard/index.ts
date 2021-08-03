import './styles';
import Component from '@/Core/Component';
import { asyncSetState, html, addComma } from '@/utils/helper';
import {
  Props,
  State,
  HistoryModelType,
  IHistory,
  Today,
  TodayModelType,
  ChartControllerType,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import DateModel from '@/Model/DateModel';
import CategoryTag from '@/Components/CategoryTag';
import ChartController from '@/Controller/ChartController';

const EXPENSE = 0;
const INCOME = 1;

interface IListStates extends State {
  historyCards: IHistory[];
  today: Today;
  selectedType: number;
}

export default class HistoryCategoryCard extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;
  chartController!: ChartControllerType;

  setup() {
    this.classIDF = 'HistoryCategoryCard';
    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);
    this.chartController = ChartController;

    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.$state = {
      historyCards: this.historyModel.historyCards,
      today: this.dateModel.today,
      selectedType: this.historyModel.selectedType,
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
  }

  template() {
    const { selectedType, historyCards } = this.$state!;
    const { categories, categoryCards } =
      this.chartController.filterHistoryCardByCategory(
        historyCards,
        selectedType
      );

    return html`
      <div class="category-percentage">
        <div class="button-area">
          <div
            class="button ${selectedType === INCOME && 'active'}"
            id="income"
          >
            수입
          </div>
          <div
            class="button ${selectedType === EXPENSE && 'active'}"
            id="outcome"
          >
            지출
          </div>
        </div>

        <ul class="category-card-list">
          ${categories
            .map(
              (category) => `
            <li class="category-card" data-category="${category}">
              <span class="category">${CategoryTag(category)}</span>
              <span class="percent">${categoryCards[category].percent}%</span>
              <span class="price">${addComma(
                categoryCards[category].price + ''
              )}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `;
  }

  handleClickOnCard(selectedCategory: string) {
    const { selectedType, historyCards } = this.$state!;
    this.chartController.filterHistoryCardBySelectedCategory(
      historyCards,
      selectedType,
      selectedCategory
    );
  }

  toggleSelectedType(type: number) {
    asyncSetState(this.historyModel.toggleSelectedType(type));
  }

  setEvent() {
    this.addEvent('click', '#income', () => this.toggleSelectedType(INCOME));
    this.addEvent('click', '#outcome', () => this.toggleSelectedType(EXPENSE));
    this.addEvent('click', '.category-card', (e: MouseEvent) => {
      const selectedCategory = (<HTMLElement>(
        (<HTMLElement>e.target)?.closest('.category-card')
      )).dataset.category;
      this.handleClickOnCard(selectedCategory!);
    });
  }

  setUnmount() {
    this.historyModel.unsubscribe(this.historyModel.key, this);
  }
}
