import { Controller, Get, Post } from '@nestjs/common';
import { retry } from 'rxjs';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return ' This get user get requrest';
  }

  @Post()
  createUser() {
    return 'this post user requrest';
  }
}
