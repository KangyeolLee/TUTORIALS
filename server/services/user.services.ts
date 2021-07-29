import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user.repository';

class UserService {
  // typedi를 이용한 디펜던시 인젝션을 해볼까...합니다(?)
  constructor() {}

  // 사실 회원가입 기능은 없지만 예시로다가..
  public async signUP() {
    try {
      const someModel = '생성자에서 구독한 모델에서 DB CURD 로직 수행';
      const user = 1;
      // const user = await getCustomRepository(UserRepository).findByEmail('123@naver.com');
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
