import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
