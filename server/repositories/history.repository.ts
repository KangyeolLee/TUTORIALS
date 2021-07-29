import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { HistoryType } from '../types/types';
import History from '../entities/History';

@EntityRepository(History)
export default class HistoryRepository extends Repository<History> {
  insertHistory(history: HistoryType): Promise<InsertResult> {
    const newHistory = this.create({
      category: history.category,
      payment: history.payment,
      price: history.price,
      content: history.content,
      type: history.type,
      createdAt: history.createAt,
      user: { id: history.userId },
    });
    return this.insert(newHistory);
  }
}
