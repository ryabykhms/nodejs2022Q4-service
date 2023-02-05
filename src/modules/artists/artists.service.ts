import { Injectable } from '@nestjs/common';
import { AlbumsStorage } from '../albums/storages/albums.storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';
import { ArtistsStorage } from './storages/artists.storage';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artists: ArtistsStorage,
    private readonly albums: AlbumsStorage,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.artists.create(createArtistDto);
  }

  getAll(): Artist[] {
    return this.artists.getAll();
  }

  getById(id: string): Artist {
    return this.artists.getById(id);
  }

  update(id: string, data: UpdateArtistDto): Artist {
    return this.artists.update(id, data);
  }

  delete(id: string): boolean {
    const isDeleted = this.artists.delete(id);
    isDeleted && this.albums.deleteByArtistId(id);

    return isDeleted;
  }
}
