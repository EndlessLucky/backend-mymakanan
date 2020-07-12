import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entites/user.entity';
import { UserDetail } from './entites/user-detail.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, UserDetail])
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
