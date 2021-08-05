import { Router, Request, Response, NextFunction } from 'express';
import historyController from '../../controllers/history.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

export default (app: Router) => {
  app.use('/histories', router);

  router.get(
    `/stat/:year/:categoryType`,
    authMiddleware,
    historyController.getAverageByMonth
  );
  router.get(`/`, authMiddleware, historyController.selectHistory);
  router.post(`/`, authMiddleware, historyController.insertHistory);
  router.put(`/:historyId`, authMiddleware, historyController.updateHistory);
  router.delete(`/:historyId`, authMiddleware, historyController.deleteHistory);
};
