import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PrismaService } from '../database/prisma.service';
import { PostsController } from './posts.controller';
import { IsAuthGuard } from '../auth/guards/is-auth/is-auth.guard';

@Module({
  providers: [PostService, PrismaService, IsAuthGuard],
  controllers: [PostsController],
})
export class PostsModule {}
