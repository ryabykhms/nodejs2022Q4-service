import { Injectable } from '@nestjs/common';
import { Favorites } from '../entities/favorites.entity';

@Injectable()
export class FavoritesStorage {
  private favorites: Favorites;

  constructor() {
    this.favorites = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  public getAlbums(): string[] {
    return this.favorites.albums;
  }

  public getArtists(): string[] {
    return this.favorites.artists;
  }

  public getTracks(): string[] {
    return this.favorites.tracks;
  }

  public getAll(): Favorites {
    return this.favorites;
  }

  public addTrack(id: string): void {
    const isTrackExists = this.favorites.tracks.find(
      (trackId) => trackId === id,
    );

    if (isTrackExists) {
      return;
    }

    this.favorites.tracks.push(id);
  }

  public addArtist(id: string): void {
    const isArtistExists = this.favorites.artists.find(
      (artistId) => artistId === id,
    );

    if (isArtistExists) {
      return;
    }

    this.favorites.artists.push(id);
  }

  public addAlbum(id: string): void {
    const isAlbumExists = this.favorites.albums.find(
      (albumId) => albumId === id,
    );

    if (isAlbumExists) {
      return;
    }

    this.favorites.albums.push(id);
  }

  public deleteTrack(id: string): boolean {
    const index = this.favorites.tracks.findIndex((trackId) => trackId === id);

    return index !== -1 && !!this.favorites.tracks.splice(index, 1);
  }

  public deleteArtist(id: string): boolean {
    const index = this.favorites.artists.findIndex((trackId) => trackId === id);

    return index !== -1 && !!this.favorites.artists.splice(index, 1);
  }

  public deleteAlbum(id: string): boolean {
    const index = this.favorites.albums.findIndex((trackId) => trackId === id);

    return index !== -1 && !!this.favorites.albums.splice(index, 1);
  }
}
