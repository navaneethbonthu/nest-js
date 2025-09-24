import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { Hashtag } from './hashtag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hastagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [hastagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
