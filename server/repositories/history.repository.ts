import {
  DeleteResult,
  EntityRepository,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { HistoryType } from '../types/types';
import History from '../entities/History';

@EntityRepository(History)
export default class HistoryRepository extends Repository<History> {
  getHistoryByMonth(id: number, date: string) {
    return (
      this.createQueryBuilder()
        // .select(`date_format(createdAt, '%Y-%m')`)
        .where('userId=:id', { id })
        .andWhere(`date_format(createdAt, '%Y-%m')=:date`, { date })
        .getMany()
    );
  }

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

  updateHistoryById(id: number, history: HistoryType): Promise<UpdateResult> {
    return this.update(id, history);
  }

  deleteHistoryById(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
}
