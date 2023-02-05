import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesStorage } from './storages/favorites.storage';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  exports: [FavoritesService],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesStorage],
})
export class FavoritesModule {}
