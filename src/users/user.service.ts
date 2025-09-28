import {
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(HashingProvider) private readonly hasingProvider: HashingProvider,
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
    log(userDto, 'userDto');
    let user = this.userRepository.create({
      ...userDto,
      password: await this.hasingProvider.hashPassword(userDto.password),
    });
    console.log(user, 'user');

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

  public async findUserByUsername(username: string) {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOneBy({ userName: username });
    } catch (error) {
      return new RequestTimeoutException(error, {
        description: 'Database Timeout',
      });
    }

    if (!user) {
      new UnauthorizedException('User Not Found');
    }

    return user;
  }
}
