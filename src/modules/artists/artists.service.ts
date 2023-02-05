import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';
import { ArtistsStorage } from './storages/artists.storage';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly collection: ArtistsStorage,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.collection.create(createArtistDto);
  }

  getAll(): Artist[] {
    return this.collection.getAll();
  }

  getById(id: string): Artist {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdateArtistDto): Artist {
    return this.collection.update(id, data);
  }

  delete(id: string): boolean {
    const isDeleted = this.collection.delete(id);

    if (isDeleted) {
      this.albumsService.removeArtistId(id);
      this.tracksService.removeArtistId(id);
      this.favoritesService.deleteArtist(id);
    }

    return isDeleted;
  }
}
