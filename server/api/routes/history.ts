import { Router, Request, Response, NextFunction } from 'express';
import historyController from '../../controllers/history.controller';

const router = Router();

export default (app: Router) => {
  app.use('/histories', router);

  // router.get(`/`, (req: any, res: any) => console.log('hi'));
  router.get(`/`, historyController.selectHistory);
  router.post(`/`, historyController.insertHistory);

  router.put(
    `/:historyId`,
    (req: Request, res: Response, next: NextFunction) => {
      return res
        .json({
          message: 'ok',
          ok: true,
        })
        .status(200);
    }
  );

  router.delete(
    `/:hisotryId`,
    (req: Request, res: Response, next: NextFunction) => {
      return res
        .json({
          message: 'ok',
          ok: true,
        })
        .status(200);
    }
  );
};
