import { Module } from '@nestjs/common';
import { AlbumsStorage } from '../albums/storages/albums.storage';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistsStorage } from './storages/artists.storage';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage, AlbumsStorage],
})
export class ArtistsModule {}
