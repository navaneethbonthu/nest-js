import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { TweetsController } from './tweets.controller';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepositary: Repository<Tweet>,
  ) {}

  getTweets(userId: number) {
    return this.tweetRepositary.find({
      where: { user: { id: userId } },
      relations: { user: true, hashtags: true },
    });
  }

  public async CreateTweet(createTweetDto: CreateTweetDto) {
    let user = await this.userService.findUserById(createTweetDto.userId);
    let hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags,
    );

    let tweet = await this.tweetRepositary.create({
      ...createTweetDto,
      user: user,
      hashtags: hashtags,
    });

    this.tweetRepositary.save(tweet);

    return tweet;
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    let hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags,
    );

    let tweet = await this.tweetRepositary.findOneBy({
      id: updateTweetDto.id,
    });

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.iamge = updateTweetDto.Image ?? tweet.iamge;
    tweet.hashtags = hashtags;

    await this.tweetRepositary.save(tweet);
    return tweet;
  }

  public async deleteTweet(id: number) {
    this.tweetRepositary.delete({ id: id });
    return { delted: true, id: id };
  }
}
