import { NextFunction, Request, Response } from 'express';
import { verify } from '../../utils/jwtAuth';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.cookie?.split('accessToken=')[1]?.split(';')[0];

  const result = verify(token ?? ''); // token을 검증합니다.
  req.payload = result;

  return next();
};
