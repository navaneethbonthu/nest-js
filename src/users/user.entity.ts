import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweets/tweet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    unique: true,
  })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert'],
    // eager: true,
  })
  // @JoinColumn()
  profile?: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @Column({ nullable: true, default: '' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  DeletedAt: Date;
}
