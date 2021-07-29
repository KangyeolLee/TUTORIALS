import { Router, Request, Response, NextFunction } from 'express';
import historyController from '../../controllers/history.controller';

const router = Router();

export default (app: Router) => {
  app.use('/histories', router);

  router.get(`/`, (req: Request, res: Response, next: NextFunction) => {
    return res
      .json({
        message: 'ok',
        ok: true,
      })
      .status(200);
  });

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
