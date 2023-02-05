import { Inject, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/albums.entity';
import { AlbumsStorage } from './storages/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly collection: AlbumsStorage,
    @Inject(TracksService) private tracksService: TracksService,
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
    isDeleted && this.tracksService.removeAlbumId(id);

    return isDeleted;
  }

  removeArtistId(artistId: string): void {
    return this.collection.removeArtistId(artistId);
  }
}
