import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/tracks.entity';

@Injectable()
export class TracksStorage {
  private tracks: Map<string, Track> = new Map();

  constructor() {
    this.tracks = new Map();
  }

  public create(track: CreateTrackDto): Track {
    const id = randomUUID();
    this.tracks.set(id, { ...track, id });

    return this.getById(id);
  }

  public getAll(): Track[] {
    return Array.from(this.tracks.values());
  }

  public getById(id: string): Track {
    return this.tracks.get(id);
  }

  public getByIdWithPassword(id: string): Track {
    return this.tracks.get(id);
  }

  public update(id: string, track: UpdateTrackDto): Track {
    const artistForUpdate = this.tracks.get(id);

    if (!artistForUpdate) {
      return;
    }

    this.tracks.set(id, { ...artistForUpdate, ...track });

    return this.getById(id);
  }

  public delete(id: string): boolean {
    return this.tracks.delete(id);
  }

  public removeArtistId(artistId: string): void {
    for (const track of this.tracks.values()) {
      if (track.artistId === artistId) {
        this.tracks.set(track.id, { ...track, artistId: null });
      }
    }
  }

  public removeAlbumId(albumId: string): void {
    for (const track of this.tracks.values()) {
      if (track.albumId === albumId) {
        this.tracks.set(track.id, { ...track, albumId: null });
      }
    }
  }
}
