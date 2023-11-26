import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  deserializeUser(id: number, done: (err: Error, user: any) => void): any {
    console.log('ID', id);
    this.userService
      .user({ id })
      .then((user) => {
        done(null, { id: user.id, username: user.username });
      })
      .catch((e) => {
        console.error(e);
        done(e, false);
      });
  }
}
