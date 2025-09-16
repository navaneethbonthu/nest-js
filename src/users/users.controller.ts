import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CrateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':isMarried?')
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.getAllUsers();
  }

  @Post()
  createUsers(@Body() user: CrateUserDto) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  // @Patch()
  // updateUser(@Body() user: UpdateUserDto) {
  //   return 'User patched successfully';
  // }
}
