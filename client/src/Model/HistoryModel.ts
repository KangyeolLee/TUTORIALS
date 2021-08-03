import { getHistories } from '@/api/history';
import { dummyhistories } from '@/assets/dummy';
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

class HistoryModel extends Observable {
  key: string = 'history';
  historyCards: IHistory[];
  historyType: HistoryType;
  priceAmount: PriceAmountType;
  historyCardForToday: IHistory[];

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
  }

  async getHistoryCard(today: Today) {
    const { year, month } = today;
    const { data } = await getHistories({ year, month });
    const { historyList } = data;
    this.historyCards = historyList;
    return this.notify(this.key, { historyCards: historyList });
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

  addHistory(history: IHistory) {
    const nextHistory = [...this.historyCards, history];
    this.historyCards = nextHistory;

    return this.notify(this.key, { historyCards: nextHistory });
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

  private filterHistoryCardsByMonth(today: Today): void {
    this.historyCards = dummyhistories
      .filter((history) => {
        const [year, month, _] = history.createdAt
          .split('-')
          .map((d) => parseInt(d));
        return today.year === year && today.month === month;
      })
      .map((history) => {
        return {
          createdAt: history.createdAt,
          type: history.type,
          category: history.category,
          content: history.content,
          payment: history.payment,
          price: history.price,
          id: history.id,
        };
      });
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
