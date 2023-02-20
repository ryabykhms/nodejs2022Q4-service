import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/albums.entity';
import { AlbumsStorage } from './storages/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly collection: AlbumsStorage,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.collection.create(createAlbumDto);
  }

  getAll(): Album[] {
    return this.collection.getAll();
  }

  getById(id: string): Album {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdateAlbumDto): Album {
    return this.collection.update(id, data);
  }

  delete(id: string): boolean {
    const isDeleted = this.collection.delete(id);

    if (isDeleted) {
      this.tracksService.removeAlbumId(id);
      this.favoritesService.deleteAlbum(id);
    }

    return isDeleted;
  }

  removeArtistId(artistId: string): void {
    return this.collection.removeArtistId(artistId);
  }
}
