import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
