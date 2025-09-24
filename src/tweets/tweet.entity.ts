import { Hashtag } from 'src/hashtag/hashtag.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  iamge?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;

  @ManyToOne(() => User, (user) => user.tweets, { eager: true })
  user: User;

  @ManyToMany(() => Hashtag, (hastag) => hastag.tweets)
  @JoinTable()
  hashtags: Hashtag[];
}
