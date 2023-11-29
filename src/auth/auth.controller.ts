import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createUserDto } from '../users/dto/createUserDto';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './localAuth.guard';
import { IsAuthGuard } from './guards/is-auth/is-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() body: createUserDto,
    @Req() req: Request & { session: { passport?: any } },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    const user = await this.authService.signUp(username, password);
    if (user) {
      req.session.passport = { user: user.id };
      res.redirect('/user');
    }
  }

  @Post('logout')
  @UseGuards(IsAuthGuard)
  async logout(@Req() req: Request) {
    req.session.destroy((err) => {
      if (err)
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    });
    return 'Success';
  }
}
