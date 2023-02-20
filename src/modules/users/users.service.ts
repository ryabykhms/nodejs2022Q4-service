import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SafeUser } from './entities/safe-user.entity';
import { UsersStorage } from './storages/users.storage';

@Injectable()
export class UsersService {
  constructor(private readonly collection: UsersStorage) {}

  create(createUserDto: CreateUserDto): SafeUser {
    return this.collection.create(createUserDto);
  }

  getAll(): SafeUser[] {
    return this.collection.getAll();
  }

  getById(id: string): SafeUser {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdatePasswordDto): SafeUser {
    const user = this.collection.getByIdWithPassword(id);

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
