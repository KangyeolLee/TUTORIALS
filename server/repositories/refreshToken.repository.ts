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

  createRefreshToken(token: string): Promise<InsertResult> {
    const user = this.create({ token });
    return this.insert(user);
  }

  updateRefreshToken(id: number, token: string): Promise<UpdateResult> {
    return this.update(id, { token });
  }
}
