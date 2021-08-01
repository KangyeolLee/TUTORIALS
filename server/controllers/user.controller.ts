import { NextFunction, Request, Response } from 'express';
import qs from 'qs';
import userService from './../services/user.services';
import tokenService from '../services/token.services';
import config from '../config';
import { ResultRawType, UserProfile } from '../types/types';
import { Container } from 'typedi';

const UserServices = Container.get(userService);
const TokenServices = Container.get(tokenService);

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize?';

class UserController {
  async requestGithub(req: Request, res: Response, next: NextFunction) {
    const state = Math.random().toString(36).substr(2);
    try {
      const query = qs.stringify({
        client_id: config.GithubClient,
        redirect_url: config.RedirectUrl,
        state,
        scope: 'user:email',
      });

      const redirectUrl = GITHUB_AUTHORIZE + query;
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
      const userProfile: UserProfile = await UserServices.getUserProfile(
        accessToken
      );

      let userId: number;
      const user = await UserServices.findUserByGithubUser(userProfile.login);

      if (!user) {
        const result = await UserServices.createUserByGithubUser(
          userProfile.login
        );
        const {
          raw: { insertId },
        }: ResultRawType = result!;
        userId = insertId;
      } else {
        userId = user.id;
      }

      // userId로 토큰 생성
      const { access, refresh } = await TokenServices.issueToken(userId);

      res.append('Set-Cookie', `accessToken=${access}; Path=/; HttpOnly;`);
      res.append(
        'Set-Cookie',
        `refreshToken=${refresh}; Path=/refresh; HttpOnly;`
      );
      return res.redirect('http://localhost:8080/main');
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // 서비스에서 로그인 호출
      // 토큰 반환
      res.append('Set-Cookie', `accessToken=; Path=/; HttpOnly;`);
      res.append('Set-Cookie', `refreshToken=; Path=/refresh; HttpOnly;`);
      return res.json({
        ok: true,
        message: '로그아웃 되었네요 ㅊㅋ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
