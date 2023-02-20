import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { omit } from 'src/utils/omit';
import { CreateUserDto } from '../dto/create-user.dto';
import { SafeUser } from '../entities/safe-user.entity';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  public create(user: CreateUserDto): SafeUser {
    const id = randomUUID();
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const version = 1;
    const newUser = { ...user, id, createdAt, updatedAt, version };
    this.users.set(id, newUser);

    return this.getById(id);
  }

  public getAll(): SafeUser[] {
    return Array.from(this.users.values()).map((user) =>
      omit(user, 'password'),
    );
  }

  public getById(id: string): SafeUser {
    return omit(this.users.get(id), 'password');
  }

  public getByIdWithPassword(id: string): User {
    return this.users.get(id);
  }

  public update(id: string, user: Partial<User>): SafeUser {
    const userForUpdate = this.users.get(id);

    if (!userForUpdate) {
      return;
    }

    const updatedAt = Date.now();
    const version = userForUpdate.version + 1;

    this.users.set(id, { ...userForUpdate, ...user, updatedAt, version });

    return this.getById(id);
  }

  public delete(id: string): boolean {
    return this.users.delete(id);
  }
}
