import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@UseInterceptors(NotFoundInterceptor)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.addTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.addArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.deleteArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.deleteAlbum(id);
  }
}
