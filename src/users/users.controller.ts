import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IsAuthGuard } from '../auth/guards/is-auth/is-auth.guard';
import { UserService } from './services/user.service';
import { getTakeAndSkip } from '../utils/getTakeAndSkip';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(IsAuthGuard)
  getUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.user({ id }).catch((e) => {
      console.error(e);
      throw new HttpException(
        'Something went wrong, we are sorry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    if (!user) throw new BadRequestException('No user were found');

    return { username: user.username, id: user.id, posts: user.posts };
  }

  @Get('many/:page')
  async getUsers(
    @Param('page', ParseIntPipe) page: number,
    @Query('q') query: string,
    @Query('limit') limit?: string,
  ) {
    const { take, skip } = getTakeAndSkip(page, limit);
    const { totalPages, users } = await this.userService
      .users({
        skip,
        take,
        where: {
          username: { contains: query },
        },
      })
      .catch((e) => {
        console.error(e);
        throw new HttpException(
          'Something went wrong, we are sorry',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return { totalPages, users };
  }
}
