import { NextFunction, Request, Response } from 'express';
import HistoryService from './../services/history.services';

class HistoryController {
  //  history 조회
  async selectHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const year = req.query.year as string;
      const month = req.query.month as string;
      const id: number = req.body.id;

      const historyList = await HistoryService.selectHistory(id, year, month);

      res
        .json({ ok: true, message: '내역이 조회되었습니다.', historyList })
        .status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 조회에 실패했습니다.' }).status(200);
    }
  }

  // 새로운 history 추가
  async insertHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { history } = req.body;
      const historyId: number = await HistoryService.insertHistory(history);

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
      await HistoryService.updateHistory(historyId, history);

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
      await HistoryService.deleteHistory(historyId);

      res.json({ ok: true, message: '내역이 삭제되었습니다.' }).status(200);
    } catch (error) {
      res.json({ ok: false, message: '내역 삭제에 실패했습니다.' }).status(200);
    }
  }
}

export default new HistoryController();
