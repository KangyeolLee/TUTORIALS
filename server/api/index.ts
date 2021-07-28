import { Router } from 'express';
import user from './routes/user.routes';

export default () => {
  const app = Router();
  user(app);

  return app;
};
