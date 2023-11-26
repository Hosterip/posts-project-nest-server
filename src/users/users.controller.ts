import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
export class UsersController {
  @Get('')
  getUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
