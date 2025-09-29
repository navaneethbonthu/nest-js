import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly jwtService: JwtService,
    private readonly refloctor: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.refloctor.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return Promise.resolve(true);
    }

    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
      );
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return Promise.resolve(true);
  }
}
