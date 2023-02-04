import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  public create(user: CreateUserDto): User {
    const id = randomUUID();
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const version = 1;
    const newUser = { ...user, id, createdAt, updatedAt, version };
    this.users.set(id, newUser);
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  public getAll(): User[] {
    return Array.from(this.users).map(([id, user]) => user);
  }

  public getById(id: string): User {
    return this.users.get(id);
  }

  public update(id: string, user: Partial<User>): User {
    const userForUpdate = this.users.get(id);

    if (!userForUpdate) {
      return;
    }

    const updatedAt = Date.now();
    const version = userForUpdate.version + 1;

    this.users.set(id, { ...userForUpdate, ...user, updatedAt, version });

    const userWithoutPassword = this.users.get(id);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  public delete(id: string): boolean {
    return this.users.delete(id);
  }
}
