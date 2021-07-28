import { dummyhistories } from '@/assets/dummy';
import Observable from '@/Core/Observable';
import { IHistory } from '@/utils/types';

type typeString = 'expense' | 'income';
interface HistoryType {
  expense?: boolean;
  income?: boolean;
}

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
    this.initHistoryCard();
  }

  initHistoryCard() {
    dummyhistories.forEach((history) => {
      const newHistory: IHistory = {
        date: history.create_time,
        type: history.type,
        category: history.category,
        content: history.content,
        payment: history.payment,
        price: history.price,
      };
      this.historyCards.push(newHistory);
    });
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
}

export default new MainModel();
