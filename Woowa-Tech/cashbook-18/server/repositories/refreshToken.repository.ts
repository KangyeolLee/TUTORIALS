import {
  EntityRepository,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import RefreshToken from '../entities/RefreshToken';

@EntityRepository(RefreshToken)
export default class RefreshTokenRepository extends Repository<RefreshToken> {
  findByUserId(id: number): Promise<RefreshToken | undefined> {
    return this.findOne(id);
  }

  createRefreshToken(userId: number, token: string): Promise<RefreshToken> {
    const user = this.create({ user: { id: userId }, token });
    return this.save(user);
  }

  updateRefreshToken(userId: number, token: string): Promise<UpdateResult> {
    return this.update(userId, { token });
  }
}
