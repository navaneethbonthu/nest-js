import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) // Inject the Profile repository
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public getAllProfiles() {
    return this.profileRepository.find();
  }
}
