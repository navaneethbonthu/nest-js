import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createuserDto: CrateUserDto) {
    return await this.authService.signUp(createuserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }
}
