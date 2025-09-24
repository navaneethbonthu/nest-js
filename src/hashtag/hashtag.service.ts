import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hastagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    let hashtag = this.hastagRepository.create(createHashtagDto);
    return await this.hastagRepository.save(hashtag);
  }

  public async findHashtags(hashtags: number[]) {
    return this.hastagRepository.find({
      where: { id: In(hashtags) },
    });
  }

  public async deleteHashtag(id: number) {
    this.hastagRepository.delete({ id });
    return { delted: true, id: id };
  }
}
