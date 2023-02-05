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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';

@ApiTags('Artist')
@Controller('artist')
@UseInterceptors(NotFoundInterceptor)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Add new artist' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistsService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Get all artists' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistsService.getAll();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.getById(id);
  }

  @ApiOperation({ summary: 'Update artist by id' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateArtistDto,
  ): Artist {
    return this.artistsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete artist by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    return this.artistsService.delete(id) ? null : undefined;
  }
}
