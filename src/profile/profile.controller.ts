import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public getProfiles() {
    return this.profileService.getAllProfiles();
  }
}
