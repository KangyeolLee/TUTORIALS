import { dummyhistories } from '@/assets/dummy';
import Observable from '@/Core/Observable';
import { IHistory } from '@/utils/types';

class MainModel extends Observable {
  private historyCards: IHistory[];

  constructor() {
    super();
    this.historyCards = [];
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

  addHistory(key: string, history: IHistory) {
    const nextHistory = [...this.historyCards, history];
    this.historyCards = nextHistory;

    this.notify(key, nextHistory);
  }
}

export default new MainModel();
