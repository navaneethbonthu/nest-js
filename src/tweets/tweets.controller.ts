import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { log } from 'console';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get(':userId')
  public getTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetsService.getTweets(userId);
  }

  @Post()
  public createTweet(
    @Body() tweet: CreateTweetDto,
    @CurrentUser('sub') userId,
  ) {
    return this.tweetsService.CreateTweet(tweet, userId);
  }

  @Patch()
  public updateTweet(@Body() tweet: UpdateTweetDto) {
    return this.tweetsService.updateTweet(tweet);
  }

  @Delete(':id')
  public deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetsService.deleteTweet(id);
  }
}
