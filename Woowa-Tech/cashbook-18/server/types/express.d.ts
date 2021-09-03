import { Payload } from './types';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    export interface Request {
      payload: Payload;
    }
  }
}
