import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { HistoryType } from '../types/types';
import History from '../entities/History';

@EntityRepository(History)
export default class HistoryRepository extends Repository<History> {
  insertHistory(history: HistoryType): Promise<InsertResult | undefined> {
    const result = this.create({
      category: '생활',
      payment: '현대카드',
      content: '냉장고구입',
      type: 0,
      price: history.price,
      user: { id: history.userId },
    });
    return this.insert(result);
  }
}
