import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { getTakeAndSkip } from '../utils/getTakeAndSkip';
import { PostService } from './services/post.service';
import { createPostDto } from './createPostDto';
import { Request } from 'express';
import { IsAuthGuard } from '../auth/guards/is-auth/is-auth.guard';

interface RequestWithUser extends Request {
  user: { username: string; id: number };
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get('/:page')
  async getPosts(
    @Param('page', ParseIntPipe) page: number,
    @Query('q') query: string,
    @Query('limit') limit?: string,
  ) {
    const { take, skip } = getTakeAndSkip(page, limit);
    const { totalPages, posts } = await this.postService
      .getPosts({
        skip,
        take,
        where: {
          title: { contains: query },
        },
      })
      .catch((e) => {
        console.error(e);
        throw new HttpException(
          'Something went wrong, we are sorry',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return { totalPages, posts };
  }

  @Post('create')
  @UseGuards(IsAuthGuard)
  @UsePipes(new ValidationPipe())
  async createPost(
    @Req() { user }: RequestWithUser,
    @Body() post: createPostDto,
  ) {
    const { id } = user;
    const { title, body } = post;
    await this.postService
      .createPost({
        title,
        body,
        author: { connect: { id } },
      })
      .catch((e) => {
        console.error(e);
        throw new HttpException(
          'Something went wrong, we are sorry',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return post;
  }
}
