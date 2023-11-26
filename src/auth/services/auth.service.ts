import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { genHashAndSalt, validPassword } from '../../utils/passwordUtils';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.user({
      username,
    });
    if (!user)
      throw new HttpException('Wrong username', HttpStatus.BAD_REQUEST);
    const { hash, salt } = genHashAndSalt(password);
    const hashValid = validPassword(password, salt, hash);
    if (!hashValid)
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

    return user;
  }

  async signUp(username: string, password: string): Promise<any> {
    const { hash, salt } = genHashAndSalt(password);
    const user = await this.userService.createUser({
      username,
      hash,
      salt,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
