import {
  deleteHistory,
  getSumByMonth,
  getHistories,
  insertHistory,
  updateHistory,
} from '@/api/history';
import Observable from '@/Core/Observable';
import { makeDateForm } from '@/utils/helper';
import {
  IHistory,
  Today,
  HistoryType,
  typeString,
  PriceAmountType,
} from '@/utils/types';
import dayjs from 'dayjs';

const INCOME = 1;
const EXPENSE = 0;
export type amountType = 0 | 1;

class HistoryModel extends Observable {
  key: string = 'history';
  historyCards: IHistory[];
  historyType: HistoryType;
  priceAmount: PriceAmountType;
  historyCardForToday: IHistory[];
  selectedType: number;
  selectedCategory: string;
  selectedHistoryForCategory: IHistory[];
  statList?: number[];

  constructor() {
    super();
    this.historyCards = [];
    this.historyType = {
      expense: true,
      income: true,
    };
    this.priceAmount = {
      amount: 0,
      income: 0,
      outcome: 0,
    };
    this.historyCardForToday = [];
    this.selectedType = EXPENSE;
    this.selectedCategory = '';
    this.selectedHistoryForCategory = [];
  }

  async getHistoryCard(today: Today) {
    const { year, month } = today;
    const { data } = await getHistories({ year, month });
    const { historyList } = data;
    this.historyCards = historyList;
    return this.notify(this.key, { historyCards: historyList });
  }

  async updateHistory(history: IHistory) {
    this.historyCards = [
      ...this.historyCards.filter((h) => h.id !== history.id),
      history,
    ];
    const res = await updateHistory(history);
    return this.notify(this.key, { historyCards: this.historyCards });
  }

  async deleteHistoryCard(historyId: number) {
    await deleteHistory(historyId);
    this.historyCards = this.historyCards.filter(
      (history) => history.id !== historyId
    );
    return this.notify(this.key, { historyCards: this.historyCards });
  }

  getHistoryCardForCategory(
    selectedCategory: string,
    selectedHistoryForCategory: IHistory[]
  ) {
    this.selectedCategory = selectedCategory;
    this.selectedHistoryForCategory = selectedHistoryForCategory;
    return this.notify(this.key, {
      selectedCategory: this.selectedCategory,
      selectedHistoryForCategory: this.selectedHistoryForCategory,
    });
  }

  getTodaysHistoryCard(today: Today) {
    this.filterHistoryCardByDay(today);
    return this.notify(this.key, {
      historyCardForToday: this.historyCardForToday,
    });
  }

  getHistoryPayAmount() {
    return this.filterHistoryPriceAmount();
  }

  async addHistory(history: IHistory) {
    this.historyCards = [...this.historyCards, history];
    const res = await insertHistory(history);
    console.log(history);

    return this.notify(this.key, { historyCards: this.historyCards });
  }

  async getSumByMonth(year: number, category: string, type: amountType) {
    const res = await getSumByMonth(year, category, type);

    return { statList: res.data.result };
  }

  initHistoryForToday() {
    this.historyCardForToday = [];
    return this.notify(this.key, {
      historyCardForToday: this.historyCardForToday,
    });
  }

  toggleType(nextType: typeString) {
    this.historyType[nextType] = !this.historyType[nextType];
    return this.notify(this.key, { historyType: this.historyType });
  }

  toggleSelectedType(type: number) {
    this.selectedType = type;
    return this.notify(this.key, { selectedType: this.selectedType });
  }

  private filterHistoryPriceAmount() {
    this.priceAmount = this.historyCards.reduce(
      (sum, history) => {
        sum.amount += history.type ? +history.price : -history.price;
        sum.income += history.type ? +history.price : 0;
        sum.outcome += history.type ? 0 : -history.price;
        return sum;
      },
      { amount: 0, income: 0, outcome: 0 }
    );

    return this.priceAmount;
  }

  private filterHistoryCardByDay(today: Today) {
    const { year, month, day } = today;
    const date = makeDateForm({ year, month, day: day! });
    const historyCardsForToday = this.historyCards.filter(
      (history) => dayjs(history.createdAt).format('YYYY-MM-DD') === date
    );
    this.historyCardForToday = historyCardsForToday;
  }
}

export default new HistoryModel();
