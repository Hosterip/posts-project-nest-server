import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UserService } from '../users/services/user.service';
import { PrismaService } from '../database/prisma.service';
import { LocalStrategy } from './utils/local.strategy';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/session.serializer';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    DatabaseModule,
  ],
  providers: [
    SessionSerializer,
    UserService,
    PrismaService,
    LocalStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
