import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
  MinLength,
} from 'class-validator';

export class CrateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(3, { message: 'Name requered minimun 3 charectors' })
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  isMarried: boolean;
}
