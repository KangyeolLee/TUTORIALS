import { getCustomRepository, InsertResult } from 'typeorm';
import History from '../entities/History';
import { HistoryType } from '../types/types';
import HistoryRepository from './../repositories/history.repository';

class HistoryService {
  async selectHistory(
    id: number,
    year: string,
    month: string
  ): Promise<History[] | undefined> {
    try {
      const date = `${year}-${month.padStart(2, '0')}`;
      return await getCustomRepository(HistoryRepository).getHistoryByMonth(
        id,
        date
      );
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }

  async insertHistory(history: HistoryType): Promise<number> {
    try {
      const result = await getCustomRepository(HistoryRepository).insertHistory(
        history
      );
      const historyId = result.identifiers[0].id;

      return historyId;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }
}

export default new HistoryService();
