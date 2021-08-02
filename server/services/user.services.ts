import { getCustomRepository, InsertResult } from 'typeorm';
import UserRepository from '../repositories/user.repository';
import fetch from 'node-fetch';
import config from '../config';
import { UserProfile } from '../types/types';
import User from '../entities/User';
import { Service } from 'typedi';

@Service()
export default class UserService {
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

  async checkUserAlreadyExist(
    userProfile: UserProfile,
    user: User | undefined
  ) {
    try {
      let userId: number;

      if (!user) {
        const result = await this.createUserByGithubUser(userProfile.login);
        userId = extractInsertId(result);
      } else {
        userId = user.id;
      }

      return userId;
    } catch (error) {
      throw new Error('[유저체크에러]' + error);
    }
  }

  async getAccessToken(code: string): Promise<string> {
    try {
      const option = config.gitAccessOption(code);
      const accessTokenResponse = await fetch(
        config.GithubAccessToken,
        option
      ).then((res) => res.json());
      return accessTokenResponse.access_token;
    } catch (error) {
      throw new Error('[GITHUB 토큰에러]' + error);
    }
  }

  async getUserProfile(token: string): Promise<UserProfile> {
    try {
      const option = config.gitUserOption(token);
      const userProfile = await fetch(config.GithubUser, option).then((res) =>
        res.json()
      );
      return userProfile;
    } catch (error) {
      throw new Error('[GITHUB API에러]' + error);
    }
  }
}
