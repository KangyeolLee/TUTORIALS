import { Service } from 'typedi';
import { getCustomRepository } from 'typeorm';
import History from '../entities/History';
import { HistoryType, ResultRawType } from '../types/types';
import HistoryRepository from './../repositories/history.repository';

@Service()
export default class HistoryService {
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
      throw new Error('[history 쿼리 에러] ' + error);
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
      throw new Error('[history 쿼리 에러] ' + error);
    }
  }

  async updateHistory(
    historyId: number,
    history: HistoryType
  ): Promise<number> {
    try {
      const result = await getCustomRepository(
        HistoryRepository
      ).updateHistoryById(historyId, history);

      return historyId;
    } catch (error) {
      throw new Error('[history 쿼리 에러] ' + error);
    }
  }

  async deleteHistory(historyId: number): Promise<number> {
    try {
      const result = await getCustomRepository(
        HistoryRepository
      ).deleteHistoryById(historyId);

      return historyId;
    } catch (error) {
      throw new Error('[history 쿼리 에러] ' + error);
    }
  }

  async getSumByMonth(
    id: number,
    categoryType: string,
    year: number
  ): Promise<number[]> {
    try {
      const result = await getCustomRepository(HistoryRepository).getSumByMonth(
        id,
        categoryType,
        year
      );

      const sumForMonth = [];
      for (let i = 0, j = 0; i < 12; i++) {
        if (j < result.length && Number(result[j].month) === i) {
          sumForMonth.push(Number(result[j++].sum));
        } else sumForMonth.push(0);
      }

      return sumForMonth;
    } catch (error) {
      throw new Error('[history 쿼리 에러] ' + error);
    }
  }
}
