import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<{ posts: Post[]; totalPages: number }> {
    const { skip, take, where, orderBy } = params;
    const totalCount = await this.prisma.post.count({ where });
    const posts = await this.prisma.post.findMany({
      skip,
      take,
      where,
      orderBy,
    });
    return { posts, totalPages: Math.ceil(totalCount / take) };
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }
}
