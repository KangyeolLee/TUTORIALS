import './styles';
import Component from '@/Core/Component';
import { asyncSetState, html, addComma } from '@/utils/helper';
import {
  Props,
  State,
  HistoryModelType,
  IHistory,
  Today,
  HistoryType,
  TodayModelType,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import DateModel from '@/Model/DateModel';
import CategoryTag from '@/Components/CategoryTag';

const EXPENSE = 0;
const INCOME = 1;

interface IListStates extends State {
  historyCards: IHistory[];
  today: Today;
  type: number;
}

type accType = {
  [key: string]: {
    price: number;
    percent: number;
  };
};

export default class HistoryCategoryCard extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;

  setup() {
    this.classIDF = 'HistoryCategoryCard';
    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);

    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.$state = {
      historyCards: this.historyModel.historyCards,
      today: this.dateModel.today,
      type: EXPENSE,
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
  }

  template() {
    const { categories, categoryCards } = this.composeCategory();
    console.log(categories, categoryCards);
    return html`
      <div class="category-percentage">
        <div class="button-area">
          <div id="income">수입</div>
          <div id="outcome">지출</div>
        </div>

        <ul class="category-card-list">
          ${categories
            .map(
              (category) => `
            <li class="category-card">
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

  toggleTypeToIncome() {
    this.setState({ ...this.$state!, type: INCOME });
  }

  toggleTypeToExpense() {
    this.setState({ ...this.$state!, type: EXPENSE });
  }

  setEvent() {
    this.addEvent('click', '#income', () => this.toggleTypeToIncome());
    this.addEvent('click', '#outcome', () => this.toggleTypeToExpense());
  }

  composeCategory() {
    const { historyCards, type } = this.$state!;
    const typedHistoryCards = historyCards.filter(
      (history) => history.type === type
    );
    const categories = Array.from(
      new Set(typedHistoryCards.map((history) => history.category))
    );

    const priceAmount = historyCards
      .filter((history) => history.type === type)
      .reduce((acc, cur) => {
        return acc + Number(cur.price);
      }, 0);

    console.log(priceAmount);

    const categoryCards = typedHistoryCards.reduce((acc: accType, history) => {
      if (!acc[history.category]) {
        acc[history.category] = { price: 0, percent: 0 };
        acc[history.category].price += +history.price;
        return acc;
      }

      acc[history.category].price += +history.price;
      return acc;
    }, {});

    Object.entries(categoryCards).forEach((card) => {
      const [key, value] = card;
      categoryCards[key].percent = Math.round(
        (value.price / priceAmount) * 100
      );
    });

    return { categories, categoryCards };
  }

  setUnmount() {
    this.historyModel.unsubscribe(this.historyModel.key, this);
  }
}
