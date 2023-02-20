import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/tracks.entity';
import { TracksStorage } from './storages/tracks.storage';

@Injectable()
export class TracksService {
  constructor(
    private readonly collection: TracksStorage,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    return this.collection.create(createTrackDto);
  }

  getAll(): Track[] {
    return this.collection.getAll();
  }

  getById(id: string): Track {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdateTrackDto): Track {
    return this.collection.update(id, data);
  }

  delete(id: string): boolean {
    const isDeleted = this.collection.delete(id);

    if (isDeleted) {
      this.favoritesService.deleteTrack(id);
    }

    return isDeleted;
  }

  removeArtistId(artistId: string): void {
    return this.collection.removeArtistId(artistId);
  }

  removeAlbumId(albumId: string): void {
    return this.collection.removeAlbumId(albumId);
  }
}
