import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  public async CreateTweet(createTweetDto: CreateTweetDto, userId: number) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let hashtags;
    try {
      hashtags = await this.hashtagService.findHashtags(
        createTweetDto.hashtags,
      );
    } catch (error) {
      throw new BadRequestException('Invalid hashtags provided');
    }

    let tweet;
    try {
      tweet = this.tweetRepositary.create({
        ...createTweetDto,
        user: user,
        hashtags: hashtags,
      });
      await this.tweetRepositary.save(tweet);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create tweet');
    }

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
