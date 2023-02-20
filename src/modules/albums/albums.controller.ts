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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/albums.entity';

@ApiTags('Album')
@Controller('album')
@UseInterceptors(NotFoundInterceptor)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Add new album' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumsService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.albumsService.getAll();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumsService.getById(id);
  }

  @ApiOperation({ summary: 'Update album by id' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateAlbumDto,
  ): Album {
    return this.albumsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete album by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    return this.albumsService.delete(id) ? null : undefined;
  }
}
