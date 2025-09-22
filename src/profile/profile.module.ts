import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]), // Add this line
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
