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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthorizeGuard } from 'src/auth/guards/authorization.guard';

@Controller('users')
// @UseGuards(AuthorizeGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':isMarried?')
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id) {
    return this.userService.deleteUser(id);
  }
}
