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
    return this.createQueryBuilder()
      .where('userId=:id', { id })
      .andWhere(`date_format(createdAt, '%Y-%m')=:date`, { date })
      .getMany();
  }

  insertHistory(history: HistoryType): Promise<InsertResult> {
    const newHistory = this.create({
      category: history.category,
      payment: history.payment,
      price: history.price,
      content: history.content,
      type: history.type,
      createdAt: history.createdAt,
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
  /**
   * select date_format(createdAt, '%m') as month, avg(price) from history
where userId=1 and date_format(createdAt, '%Y')='2021' and category='식비'
group by month
   */

  async getAverageByMonth(
    id: number,
    categoryType: string,
    year: number
  ): Promise<{ month: string; average: string }[]> {
    const result = await this.createQueryBuilder()
      .select([
        `date_format(createdAt, '%m') AS month`,
        `round(avg(price)) AS average`,
      ])
      .where('userId=:id', { id })
      .andWhere('category=:categoryType', { categoryType })
      .andWhere(`date_format(createdAt, '%Y')=:year`, { year })
      .andWhere('type=0')
      .groupBy('month')
      .orderBy('month')
      .getRawMany();
    return result;
  }
}
