import { Request, Response } from 'express';
import { InsertResult } from 'typeorm';
import { ResultRawType } from '../types/types';

export const getPayload = (req: Request): number => {
  return req.payload.ok ? req.payload.id : 1;
};

export const setRandomString = () => Math.random().toString(36).substr(2);

export const extractInsertId = (result: InsertResult) => {
  const {
    raw: { insertId },
  }: ResultRawType = result;

  return insertId;
};
