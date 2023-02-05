import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersStorage } from './storages/users.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersStorage],
})
export class UsersModule {}