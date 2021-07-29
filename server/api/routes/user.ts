import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

export default (app: Router) => {
  app.use('/users', router);

  router.get('/me', (req: Request, res: Response, next: NextFunction) => {
    return res
      .json({
        user: '유저입니다',
      })
      .status(200);
  });
};
