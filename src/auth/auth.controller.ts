import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { createUserDto } from '../users/dto/createUserDto';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './localAuth.guard';

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
  register(@Body() body: createUserDto) {
    const { username, password } = body;
    this.authService.signUp(username, password).then(() => AuthGuard('local'));
  }
}
