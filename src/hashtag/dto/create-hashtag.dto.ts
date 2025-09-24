import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateHashtagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
