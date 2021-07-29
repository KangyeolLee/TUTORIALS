import { NextFunction, Request, Response } from 'express';
import HistoryService from './../services/history.services';

class HistoryController {
  async insertHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { history } = req.body;
      const user = await HistoryService.insertHistory(history);
      console.log(user);
      res.json({ user }).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new HistoryController();
