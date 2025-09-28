import { Inject, Injectable } from '@nestjs/common';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';

import { UsersService } from 'src/users/user.service';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
  ) {}

  async signUp(user: CrateUserDto) {
    return await this.userService.createUser(user);
  }
}
