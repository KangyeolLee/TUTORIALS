import { DeleteUserInput } from './dto/input/delete-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { UpdateUserInput } from './dto/input/update-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [];

  /**
   * createUser
   */
  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuid(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }

  /**
   * updateUser
   */
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );

    Object.assign(user, updateUserData);

    return user;
  }

  /**
   * getUser
   */
  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  /**
   * getUsers
   */
  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userId.map((userId) => this.getUser({ userId }));
  }

  /**
   * deleteUser
   */
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
