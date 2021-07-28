import { NextFunction, Request, Response } from 'express';
import UserService from './../services/user.services';

class UserController {
  async userSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.signUP();
      res.json({ user }).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
