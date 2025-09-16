import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  providers: [ProfileService],
})
export class ProfileModule {}
