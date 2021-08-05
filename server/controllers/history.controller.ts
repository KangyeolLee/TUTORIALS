import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { getPayload } from '../utils/helper';
import historyServices from './../services/history.services';

const HistoryServices = Container.get(historyServices);

class HistoryController {
  //  history 조회
  async selectHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month } = req.query;
      if (typeof year !== 'string' || typeof month !== 'string')
        throw new Error('year과 month가 유효하지 않습니다.');

      const id: number = getPayload(req);
      const historyList = await HistoryServices.selectHistory(id, year, month);

      res
        .json({ ok: true, message: '내역이 조회되었습니다.', historyList })
        .status(200);
    } catch (error) {
      res
        .json({ ok: false, message: '내역 조회에 실패했습니다.', error })
        .status(200);
    }
  }

  // 새로운 history 추가
  async insertHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getPayload(req);
      const { history } = req.body;
      history.userId = userId;
      const historyId: number = await HistoryServices.insertHistory(history);

      res
        .json({ ok: true, message: '내역이 추가되었습니다.', historyId })
        .status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 추가에 실패했습니다.' }).status(200);
    }
  }

  // history 수정
  async updateHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const historyId = +req.params.historyId;
      const { history } = req.body;
      await HistoryServices.updateHistory(historyId, history);

      res
        .json({ ok: true, message: '내역이 수정되었습니다.', historyId })
        .status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 수정에 실패했습니다.' }).status(200);
    }
  }

  // history 삭제
  async deleteHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const historyId = +req.params.historyId;
      await HistoryServices.deleteHistory(historyId);

      res.json({ ok: true, message: '내역이 삭제되었습니다.' }).status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 삭제에 실패했습니다.' }).status(200);
    }
  }

  async getSumByMonth(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getPayload(req);
      const { categoryType, year, type } = req.body;
      const result = await HistoryServices.getSumByMonth(
        userId,
        categoryType,
        +year,
        type
      );

      res
        .json({
          ok: true,
          message: '카테고리&월별 내역 평균이 조회되었습니다.',
          result,
        })
        .status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 조회에 실패했습니다.' }).status(200);
    }
  }
}

export default new HistoryController();
