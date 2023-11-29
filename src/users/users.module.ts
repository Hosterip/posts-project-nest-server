import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../database/prisma.service';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UsersModule {}
