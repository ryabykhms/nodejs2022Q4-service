import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';
import { ArtistsStorage } from './storages/artists.storage';

@Injectable()
export class ArtistsService {
  constructor(private readonly collection: ArtistsStorage) {}

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
    return this.collection.delete(id);
  }
}
