// src/services/UserService.ts

import { Service } from "@tsed/di";
import { User } from "../models/User";

@Service()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async registerUser(user: User): Promise<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }
}
