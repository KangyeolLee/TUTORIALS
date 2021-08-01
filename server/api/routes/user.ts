import { Router } from 'express';
import UserController from '../../controllers/user.controller';

const router = Router();

export default (app: Router) => {
  app.use('/user', router);

  router.get('/login', UserController.requestGithub); // github redirect
  router.get('/callback', UserController.login);
  router.post('/logout', UserController.logout);
};
