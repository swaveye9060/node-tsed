// src/models/User.ts

import { Property, Required } from "@tsed/schema";

export class User {
  @Property()
  id: number;

  @Required()
  @Property()
  name: string;

  @Required()
  @Property()
  email: string;

  @Required()
  @Property()
  password: string;
}
