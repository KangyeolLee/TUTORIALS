import { NextFunction, Request, Response } from 'express';
import qs from 'qs';
import UserService from './../services/user.services';
import TokenService from '../services/token.services';
import config from '../config';
import { ResultRawType, UserProfile } from '../types/types';

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
      const accessToken: string = await UserService.getAccessToken(
        code as string
      );
      const userProfile: UserProfile = await UserService.getUserProfile(
        accessToken
      );

      // 분리할 수 있다면 Service 계층으로 이동 : UserService.checkUserProfile(userProfile.login)
      let userId: number;
      const user = await UserService.findUserByGithubUser(userProfile.login);

      if (!user) {
        const result = await UserService.createUserByGithubUser(
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
      const { access, refresh } = await TokenService.issueToken(userId);

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
