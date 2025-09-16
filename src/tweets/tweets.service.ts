import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
  constructor() {}

  tweets: { text: string; date: Date; userId: number }[] = [
    {
      text: 'Hello, world! This is my first tweet.',
      date: new Date('2025-09-10T10:00:00Z'),
      userId: 1,
    },
    {
      text: 'Enjoying a beautiful day outside.',
      date: new Date('2025-09-11T12:30:00Z'),
      userId: 2,
    },
    {
      text: 'Just finished an amazing book. Highly recommend!',
      date: new Date('2025-09-12T15:45:00Z'),
      userId: 1,
    },
    {
      text: 'Working on a new project. Stay tuned!',
      date: new Date('2025-09-13T09:15:00Z'),
      userId: 3,
    },
    {
      text: 'Great meeting with the team today.',
      date: new Date('2025-09-14T11:00:00Z'),
      userId: 2,
    },
  ];

  getTweets(userId: number) {
    return this.tweets.filter((tweet) => tweet.userId == userId);
  }
}
