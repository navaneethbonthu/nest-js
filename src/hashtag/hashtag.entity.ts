import { Tweet } from 'src/tweets/tweet.entity';
import { text } from 'stream/consumers';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags, { onDelete: 'CASCADE' })
  tweets: Tweet[];
}
