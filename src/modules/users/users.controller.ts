import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SafeUser } from './entities/safe-user.entity';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { UsersService } from './users.service';

@Controller('user')
@UseInterceptors(NotFoundInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): SafeUser {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): SafeUser {
    return this.usersService.getById(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePasswordDto,
  ): SafeUser {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    return this.usersService.delete(id) ? null : undefined;
  }
}
