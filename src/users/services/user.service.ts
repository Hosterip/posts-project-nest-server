import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IUser } from '../types/IUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput?: Prisma.UserWhereUniqueInput,
  ): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        username: true,
        hash: true,
        salt: true,
        posts: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    posts?: boolean;
  }): Promise<{
    users: IUser[];
    totalPages: number;
  }> {
    const { skip, take, where, orderBy } = params;
    const totalCount = await this.prisma.user.count({ where });
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
      select: {
        username: true,
        id: true,
      },
    });
    return { users, totalPages: Math.ceil(totalCount / take) };
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
