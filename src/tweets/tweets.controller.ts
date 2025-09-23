import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get(':userId')
  public getTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetsService.getTweets(userId);
  }

  @Post()
  public createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetsService.CreateTweet(tweet);
  }
}
