import { Router, Request, Response, NextFunction } from 'express';
import historyController from '../../controllers/history.controller';

const router = Router();

export default (app: Router) => {
  app.use('/histories', router);

  router.get(`/`, historyController.selectHistory);
  router.post(`/`, historyController.insertHistory);
  router.put(`/:historyId`, historyController.updateHistory);
  router.delete(`/:historyId`, historyController.deleteHistory);
};
