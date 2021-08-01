import { getCustomRepository, InsertResult } from 'typeorm';
import UserRepository from '../repositories/user.repository';
import fetch from 'node-fetch';
import config from '../config';
import { UserProfile } from '../types/types';
import User from '../entities/User';

const GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const GITHUB_USER = 'https://api.github.com/user';

class UserService {
  // typedi를 이용한 디펜던시 인젝션을 해볼까...합니다(?)
  // constructor() {}

  async findUserByGithubUser(githubUser: string): Promise<User | undefined> {
    try {
      const user = await getCustomRepository(UserRepository).findByGithubUser(
        githubUser
      );
      return user;
    } catch (error) {
      throw new Error('[User 쿼리오류]' + error);
    }
  }

  async createUserByGithubUser(githubUser: string): Promise<InsertResult> {
    try {
      const user = await getCustomRepository(UserRepository).createUser(
        githubUser
      );
      return user;
    } catch (error) {
      throw new Error('[User 쿼리오류]' + error);
    }
  }

  async getAccessToken(code: string): Promise<string> {
    try {
      // option은 나중에 어딘가 숨겨도 될 거 가타요~~
      const option = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: config.GithubClient,
          client_secret: config.GithubSecrets,
          code,
        }),
      };
      //--------------------------------------------
      const accessTokenResponse = await fetch(GITHUB_ACCESS_TOKEN, option).then(
        (res) => res.json()
      );
      return accessTokenResponse.access_token;
    } catch (error) {
      throw new Error('[GITHUB 토큰에러]' + error);
    }
  }

  async getUserProfile(token: string): Promise<UserProfile> {
    try {
      const option = {
        method: 'get',
        headers: {
          'Accept': 'Application/json',
          'Authorization': `token ${token}`,
          'X-OAuth-Scopes': 'user',
          'X-Accepted-OAuth-Scopes': 'user',
        },
      };
      const userProfile = await fetch(GITHUB_USER, option).then((res) =>
        res.json()
      );
      return userProfile;
    } catch (error) {
      throw new Error('[GITHUB API에러]' + error);
    }
  }
}

export default new UserService();
