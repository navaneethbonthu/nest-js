import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTo {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
