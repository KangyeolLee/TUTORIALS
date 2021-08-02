import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

export default (app: Router) => {
  app.use('/user', router);

  router.post('/', authMiddleware, UserController.getUserInfo);
  router.get('/login', UserController.requestGithub); // github redirect
  router.get('/callback', UserController.login);
  router.post('/logout', UserController.logout);
};
