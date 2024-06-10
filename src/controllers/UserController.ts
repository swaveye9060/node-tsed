// src/controllers/UserController.ts

import { Controller, Get, Post, BodyParams } from "@tsed/common";
import { UserService } from "../services/UserService";
import { User } from "../models/User";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post("/register")
  async registerUser(@BodyParams() user: User): Promise<User> {
    return this.userService.registerUser(user);
  }
}
