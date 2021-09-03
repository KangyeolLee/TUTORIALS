import { Router } from 'express';
import category from './routes/category';
import history from './routes/history';
import payment from './routes/payment';
import user from './routes/user';

export default () => {
  const app = Router();
  user(app);
  history(app);
  category(app);
  payment(app);

  return app;
};
