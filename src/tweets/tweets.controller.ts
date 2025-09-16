import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get(':userId')
  public getTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetsService.getTweets(userId);
  }
}
