import { sign, refresh } from '../utils/jwtAuth';
import { getCustomRepository } from 'typeorm';
import RefreshTokenRepository from '../repositories/refreshToken.repository';
import { Service } from 'typedi';

@Service()
export default class TokenService {
  async issueToken(userId: number) {
    try {
      const accessToken = sign({ id: userId });
      const refreshToken = refresh();

      await getCustomRepository(RefreshTokenRepository).createRefreshToken(
        userId,
        refreshToken
      );

      return {
        access: accessToken,
        refresh: refreshToken,
      };
    } catch (error) {
      throw new Error('[토큰발행 에러]' + error);
    }
  }

  async updateToken(userId: number) {
    try {
      // 만료기간 체크는 과연 어디서 하는것일까...?
      const refreshToken = refresh();
      await getCustomRepository(RefreshTokenRepository).updateRefreshToken(
        userId,
        refreshToken
      );
    } catch (error) {
      throw new Error('[토큰갱신 에러]' + error);
    }
  }
}
