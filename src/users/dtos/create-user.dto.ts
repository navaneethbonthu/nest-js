import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

export class CrateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Password requered minimun 3 charectors' })
  @MaxLength(100)
  password: string;

  @IsOptional()
  profile: CreateProfileDto | null;
}
