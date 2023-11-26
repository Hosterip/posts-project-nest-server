import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../database/prisma.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [PrismaService],
})
export class UsersModule {}
