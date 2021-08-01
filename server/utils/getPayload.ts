import { Request } from 'express';

export const getPayload = (req: Request): number => {
  return req.payload.ok ? req.payload.id : 1;
};
