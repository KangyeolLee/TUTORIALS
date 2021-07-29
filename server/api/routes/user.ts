import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

export default (app: Router) => {
  app.use('/user', router);

  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      userId: 0,
      message: '성공적으로 로그인되었습니다.',
      ok: true,
    });
  });

  router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      message: '성공적으로 로그아웃 되었습니다.',
      ok: true,
    });
  });
};
