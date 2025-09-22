import { Profile } from 'src/profile/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Profile, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn()
  profile?: Profile;

  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  DeletedAt: Date;
}
