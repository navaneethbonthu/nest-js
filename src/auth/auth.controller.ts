import { Body, Controller, Post } from '@nestjs/common';
import { CrateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createuserDto: CrateUserDto) {
    return await this.authService.signUp(createuserDto);
  }
}
