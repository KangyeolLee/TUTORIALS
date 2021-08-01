import { NextFunction, Request, Response } from 'express';
import UserService from './../services/user.services';
import TokenService from '../services/token.services';
import config from '../config';
import { UserProfile } from '../types/types';
import { setRandomString } from '../utils/helper';
import { setCookiesForToken } from './../utils/helper';

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
      const accessToken: string = await UserService.getAccessToken(
        code as string
      );
      const userProfile: UserProfile = await UserService.getUserProfile(
        accessToken
      );

      const user = await UserService.findUserByGithubUser(userProfile.login);
      const userId = await UserService.checkUserAlreadyExist(userProfile, user);
      const { access, refresh } = await TokenService.issueToken(userId);

      setCookiesForToken(res, access, refresh);

      return res.redirect(config.RedirectClientUrl);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      setCookiesForToken(res, '', '');
      return res.json({
        ok: true,
        message: '[경]로그아웃 되었네요[축]',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
