import { getCustomRepository, InsertResult } from 'typeorm';
import History from '../entities/History';
import { HistoryType } from '../types/types';
import HistoryRepository from './../repositories/history.repository';

class HistoryService {
  async insertHistory(history: HistoryType): Promise<InsertResult | undefined> {
    try {
      const historyId = await getCustomRepository(
        HistoryRepository
      ).insertHistory(history);
      return historyId;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }
}

export default new HistoryService();
