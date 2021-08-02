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

  async initState({ year, month }: Today) {
    const res = await getHistories({ year, month });
    console.log(res);
  }

  getHistoryCard(today: Today) {
    this.filterHistoryCardsByMonth(today);
    return this.notify(this.key, { historyCards: this.historyCards });
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

  filterHistoryCardsByMonth(today: Today): void {
    this.historyCards = dummyhistories
      .filter((history) => {
        const [year, month, _] = history.create_time
          .split('-')
          .map((d) => parseInt(d));
        return today.year === year && today.month === month;
      })
      .map((history) => {
        return {
          date: history.create_time,
          type: history.type,
          category: history.category,
          content: history.content,
          payment: history.payment,
          price: history.price,
        };
      });
  }

  filterHistoryPriceAmount() {
    this.priceAmount = this.historyCards.reduce(
      (sum, history) => {
        sum.amount += history.type ? history.price : -history.price;
        sum.income += history.type ? history.price : 0;
        sum.outcome += history.type ? 0 : -history.price;
        return sum;
      },
      { amount: 0, income: 0, outcome: 0 }
    );

    return this.priceAmount;
  }

  filterHistoryCardByDay(today: Today) {
    const { year, month, day } = today;
    const date = makeDateForm({ year, month, day: day! });
    const historyCardsForToday = this.historyCards.filter(
      (history) => history.date === date
    );
    this.historyCardForToday = historyCardsForToday;
  }

  getTodaysHistoryCard(today: Today) {
    this.filterHistoryCardByDay(today);
    return this.notify(this.key, {
      historyCardForToday: this.historyCardForToday,
    });
  }
}

export default new HistoryModel();
