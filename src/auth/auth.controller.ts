import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AllowAnonymousUser } from './decorators/allow-anonymous-user.decorator';
import { RefreshTokenDTo } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @AllowAnonymousUser()
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('signup')
  @AllowAnonymousUser()
  async signUp(@Body() createuserDto: CrateUserDto) {
    return await this.authService.signUp(createuserDto);
  }

  @Post('refresh-token')
  @AllowAnonymousUser()
  async refreshToken(@Body() refreshTokenDTo: RefreshTokenDTo) {
    return await this.authService.refreshToken(refreshTokenDTo);
  }
}
