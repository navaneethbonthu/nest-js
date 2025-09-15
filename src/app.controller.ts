import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'This is a get request';
  }

  @Post()
  postHello(): string {
    return 'This is a post request';
  }

  @Delete()
  deleteHello(): string {
    return 'This is a delete request';
  }

  @Patch()
  patchHello(): string {
    return 'This is a patch request';
  }
}
