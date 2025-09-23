import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  getUserById(id: number) {}

  public async createUser(userDto: CrateUserDto) {
    userDto.profile = userDto.profile ?? {};
    let user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  public async deleteUser(id: number) {
    // let user = await this.userRepository.findOneBy({ id });

    await this.userRepository.delete(id);

    // await this.prifileRepositary.delete(user.profile.id)

    return { deleted: true };
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
