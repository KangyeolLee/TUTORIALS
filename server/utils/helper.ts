import { Request, Response } from 'express';
import { InsertResult } from 'typeorm';
import { ResultRawType } from '../types/types';

export const getPayload = (req: Request): number => {
  return req.payload.ok ? req.payload.id : 1;
};

export const setRandomString = () => Math.random().toString(36).substr(2);

export const setCookiesForToken = (
  res: Response,
  access: string,
  refresh: string
) => {
  res.append('Set-Cookie', `accessToken=${access}; Path=/; HttpOnly;`);
  res.append('Set-Cookie', `refreshToken=${refresh}; Path=/refresh; HttpOnly;`);
};

export const extractInsertId = (result: InsertResult) => {
  const {
    raw: { insertId },
  }: ResultRawType = result;

  return insertId;
};
