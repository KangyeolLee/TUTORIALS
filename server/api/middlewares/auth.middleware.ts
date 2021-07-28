import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = '대충 토큰 관련 미들웨어';
    next();
  } catch (error) {
    throw new Error('에러');
  }
};
