import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

export default (app: Router) => {
  app.use('/payments', router);

  router.get(`/`, (req: Request, res: Response, next: NextFunction) => {
    return res
      .json({
        message: '성공적으로 payment를 가져왔습니다.',
        ok: true,
      })
      .status(200);
  });

  router.post(`/`, (req: Request, res: Response, next: NextFunction) => {
    return res
      .json({
        message: '성공적으로 payment를 추가했습니다.',
        ok: true,
      })
      .status(200);
  });

  router.delete(
    `/:paymentId`,
    (req: Request, res: Response, next: NextFunction) => {
      return res
        .json({
          message: '성공적으로 payment를 삭제했습니다.',
          ok: true,
        })
        .status(200);
    }
  );
};
