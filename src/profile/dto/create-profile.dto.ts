import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'First Name requered minimun 3 charectors' })
  @MaxLength(100, { message: 'First Name requered maximum 100 charectors' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Last Name requered minimun 3 charectors' })
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  dataOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
