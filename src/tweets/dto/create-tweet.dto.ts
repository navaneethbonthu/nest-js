import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateTweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  Image?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
