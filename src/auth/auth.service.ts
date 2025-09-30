import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';

import { UsersService } from 'src/users/user.service';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './providers/hashing.provider';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDTo } from './dto/refreshToken.dto';
import { TreeRepository } from 'typeorm';
import { error } from 'console';

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
      // Use NotFoundException for user not found
      throw new NotFoundException('User not found or request timed out');
    }

    const isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isEqual) {
      // Use UnauthorizedException for invalid credentials
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.generateTokens(user);
  }

  async generateTokens(user) {
    const access_token = await this.jwtService.signAsync(
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

    const refresh_token = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.refreshTokenExpiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );

    return {
      access_token: access_token,
      refresh_token: refresh_token,
      message: 'Login Successful',
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDTo) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );

      const user = this.userService.findUserById(sub);

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
