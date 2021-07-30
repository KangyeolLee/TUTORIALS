import { dummyhistories } from '@/assets/dummy';
import Observable from '@/Core/Observable';
import { IHistory, Today, HistoryType, typeString } from '@/utils/types';

class MainModel extends Observable {
  key: string = 'history';
  historyCards: IHistory[];
  historyType: HistoryType;

  constructor() {
    super();
    this.historyCards = [];
    this.historyType = {
      expense: true,
      income: true,
    };
  }

  getHistoryCard(today: Today) {
    this.filterHistoryCardsByMonth(today);
    this.notify(this.key, { historyCards: this.historyCards });
  }

  addHistory(history: IHistory) {
    const nextHistory = [...this.historyCards, history];
    this.historyCards = nextHistory;

    this.notify(this.key, { historyCards: nextHistory });
  }

  toggleType(nextType: typeString) {
    this.historyType[nextType] = !this.historyType[nextType];
    this.notify(this.key, { historyType: this.historyType });
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
}

export default new MainModel();
