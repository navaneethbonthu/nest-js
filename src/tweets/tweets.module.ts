import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { UsersModule } from 'src/users/users.module';
import { HashtagModule } from 'src/hashtag/hastag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule, HashtagModule],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
