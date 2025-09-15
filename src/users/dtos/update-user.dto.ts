import { PartialType } from '@nestjs/mapped-types';
import { CrateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CrateUserDto) {}
