import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    email: string;
    gender: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@gmail.com',
      gender: 'female',
      isMarried: true,
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@gmail.com',
      gender: 'male',
      isMarried: false,
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@gmail.com',
      gender: 'male',
      isMarried: true,
    },
    {
      id: 4,
      name: 'Diana Miller',
      email: 'diana@gmail.com',
      gender: 'female',
      isMarried: false,
    },
    {
      id: 5,
      name: 'Ethan Davis',
      email: 'ethan@gmail.com',
      gender: 'male',
      isMarried: true,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const User = this.users.find((user) => user.id === id);
    return User;
  }

  createUser(user: {
    id: number;
    name: string;
    email: string;
    gender: string;
    isMarried: boolean;
  }) {
    // const  = {
    //   id: 7,
    //   name: 'mark',
    //   email: 'mark@gmail.com',
    //   gender: 'male',
    //   isMarried: true,
    // };
    return this.users.push(user);
  }

  // deleteUser(id: number) {
  //   return this.users.splice(id - 1, 1);
  // }
}
