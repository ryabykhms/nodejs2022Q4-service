import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artists.entity';

@Injectable()
export class ArtistsStorage {
  private artists: Map<string, Artist>;

  constructor() {
    this.artists = new Map();
  }

  public create(artist: CreateArtistDto): Artist {
    const id = randomUUID();
    this.artists.set(id, { ...artist, id });

    return this.getById(id);
  }

  public getAll(): Artist[] {
    return Array.from(this.artists.values());
  }

  public getById(id: string): Artist {
    return this.artists.get(id);
  }

  public getByIdWithPassword(id: string): Artist {
    return this.artists.get(id);
  }

  public update(id: string, artist: UpdateArtistDto): Artist {
    const artistForUpdate = this.artists.get(id);

    if (!artistForUpdate) {
      return;
    }

    this.artists.set(id, { ...artistForUpdate, ...artist });

    return this.getById(id);
  }

  public delete(id: string): boolean {
    return this.artists.delete(id);
  }
}
