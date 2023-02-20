import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/albums.entity';

@Injectable()
export class AlbumsStorage {
  private albums: Map<string, Album>;

  constructor() {
    this.albums = new Map();
  }

  public create(album: CreateAlbumDto): Album {
    const id = randomUUID();
    this.albums.set(id, { ...album, id });

    return this.getById(id);
  }

  public getAll(): Album[] {
    return Array.from(this.albums.values());
  }

  public getById(id: string): Album {
    return this.albums.get(id);
  }

  public getByIdWithPassword(id: string): Album {
    return this.albums.get(id);
  }

  public update(id: string, album: UpdateAlbumDto): Album {
    const artistForUpdate = this.albums.get(id);

    if (!artistForUpdate) {
      return;
    }

    this.albums.set(id, { ...artistForUpdate, ...album });

    return this.getById(id);
  }

  public delete(id: string): boolean {
    return this.albums.delete(id);
  }

  public removeArtistId(artistId: string): void {
    for (const album of this.albums.values()) {
      if (album.artistId === artistId) {
        this.albums.set(album.id, { ...album, artistId: null });
      }
    }
  }
}
