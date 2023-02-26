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
import { NotFoundInterceptor } from '../../interceptors/not-found.interceptor';
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
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumsService.getById(id);
  }

  @ApiOperation({ summary: 'Update album by id' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete album by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return (await this.albumsService.delete(id)) ? null : undefined;
  }
}
