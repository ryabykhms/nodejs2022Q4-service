import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { User } from './users.entity';
import { UsersStorage } from './users.storage';

@Injectable()
export class UsersService {
  constructor(private readonly collection: UsersStorage) {}

  create(createUserDto: CreateUserDto): User {
    return this.collection.create(createUserDto);
  }

  getAll() {
    return this.collection.getAll();
  }

  getById(id: string): User {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdatePasswordDto): User {
    const user = this.collection.getById(id);

    if (!user) {
      return;
    }

    if (user.password === data.oldPassword) {
      return this.collection.update(id, { password: data.newPassword });
    } else {
      throw new ForbiddenException('Incorrect password');
    }
  }

  delete(id: string): boolean {
    return this.collection.delete(id);
  }
}
