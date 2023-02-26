import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/entities/albums.entity';
import { Artist } from '../artists/entities/artists.entity';
import { Track } from '../tracks/entities/tracks.entity';
import { Favorites } from './entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Artist, Album, Track])],
  exports: [FavoritesService],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
