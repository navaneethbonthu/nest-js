import { Inject, Injectable } from '@nestjs/common';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';

import { UsersService } from 'src/users/user.service';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './providers/hashing.provider';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    @Inject(UsersService) private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CrateUserDto) {
    return await this.userService.createUser(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByUsername(loginDto.username);

    if (!user || !(user instanceof User)) {
      throw new Error('User not found or request timed out');
    }

    const isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new Error('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );

    return { access_token: token, success: true, message: 'Login Successful' };
  }
}
