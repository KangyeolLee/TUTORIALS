import { NextFunction, Request, Response } from 'express';
import userService from './../services/user.services';
import tokenService from '../services/token.services';
import config from '../config';
import { UserProfile } from '../types/types';
import { setRandomString } from '../utils/helper';
import { Container } from 'typedi';

const UserServices = Container.get(userService);
const TokenServices = Container.get(tokenService);

class UserController {
  async requestGithub(req: Request, res: Response, next: NextFunction) {
    try {
      const query = config.setQuery(setRandomString());
      const redirectUrl = config.GithubAuthorize + query;
      res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const accessToken: string = await UserServices.getAccessToken(
        code as string
      );
      const userProfile: UserProfile =
        await UserServices.getUserProfileFromGithub(accessToken);

      const user = await UserServices.findUserByGithubUser(userProfile.login);
      const userId = await UserServices.checkUserAlreadyExist(
        userProfile,
        user
      );
      const { access, refresh } = await TokenServices.issueToken(userId);

      res.cookie('accessToken', access, { httpOnly: true });
      res.cookie('refreshToken', refresh, { httpOnly: true, path: '/refresh' });

      return res.redirect(config.RedirectClientUrl);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('accessToken', { path: '/' });
      res.clearCookie('refreshToken', { path: '/refresh' });
      return res.status(200).json({
        ok: true,
        message: '[경]로그아웃 되었네요[축]',
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.payload;
      const user = await UserServices.getUserProfile(id);
      return res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
