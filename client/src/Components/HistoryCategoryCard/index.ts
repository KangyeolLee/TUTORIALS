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
  CategoryModelType,
  CategoryType,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import DateModel from '@/Model/DateModel';
import CategoryTag from '@/Components/CategoryTag';
import ChartController from '@/Controller/ChartController';
import CategoryModel from '@/Model/CategoryModel';
import NoFound from './../NoFound/index';

const EXPENSE = 0;
const INCOME = 1;

interface IListStates extends State {
  historyCards: IHistory[];
  today: Today;
  selectedType: number;
  categoryList: CategoryType[];
}

export default class HistoryCategoryCard extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;
  chartController!: ChartControllerType;
  categoryModel!: CategoryModelType;

  setup() {
    this.classIDF = 'HistoryCategoryCard';
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
      categoryList: this.categoryModel.categoryList ?? [],
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
    asyncSetState(this.categoryModel.getUserCategories());
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
        <div class="list-header">
          <p class="warning-text">오차범위: ± 0.5%</p>
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
        </div>

        <ul class="category-card-list">
          ${categories
            .map((category) => {
              const match = this.$state?.categoryList.filter(
                (c) => c.type === category
              )[0];
              return (
                match ?? {
                  id: -1,
                  type: category,
                  color: '',
                }
              );
            })
            .map(
              (category) => `
            <li class="category-card" data-category="${category.type}">
              <span class="category">${CategoryTag(category)}</span>
              <span class="percent">${
                Math.round(categoryCards[category.type].percent) === 0
                  ? '1% 이하'
                  : Math.round(categoryCards[category.type].percent) + '%'
              }</span>
              <span class="price">${addComma(
                categoryCards[category.type].price + ''
              )}</span>
            </li>
          `
            )
            .join('')}
        </ul>
        ${!categories.length && NoFound()}
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
    this.categoryModel.unsubscribe(this.categoryModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
  }
}
