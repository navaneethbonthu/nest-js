import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Profile } from './profile/profile.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    ProfileModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Profile],
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '5115',
        database: 'nest-js',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
