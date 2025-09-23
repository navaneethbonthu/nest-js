import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { TweetsController } from './tweets.controller';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TweetsService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepositary: Repository<Tweet>,
  ) {}

  getTweets(userId: number) {}

  public async CreateTweet(createTweetDto: CreateTweetDto) {
    let user = await this.userService.findUserById(createTweetDto.userId);

    let tweet = await this.tweetRepositary.create({
      ...createTweetDto,
      user: user,
    });

    return tweet;
  }
}
