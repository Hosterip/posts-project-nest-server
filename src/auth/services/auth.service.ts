import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { genHashAndSalt, validPassword } from '../utils/passwordUtils';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.user({
      username,
    });
    if (!user)
      throw new HttpException('Wrong username', HttpStatus.BAD_REQUEST);

    const hashValid = validPassword(password, user.salt, user.hash);
    if (!hashValid)
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

    return user;
  }

  async signUp(username: string, password: string): Promise<any> {
    const { hash, salt } = genHashAndSalt(password);
    return await this.userService
      .createUser({
        username,
        hash,
        salt,
      })
      .catch((e) => {
        console.error(e);
        throw new HttpException(
          'Username must be unique',
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
