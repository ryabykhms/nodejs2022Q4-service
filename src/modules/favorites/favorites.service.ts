import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../albums/entities/albums.entity';
import { Artist } from '../artists/entities/artists.entity';
import { Track } from '../tracks/entities/tracks.entity';
import { FavoritesResponse } from './entities/favorites-response.entity';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favorites: Repository<Favorites>,
    @InjectRepository(Artist)
    private artists: Repository<Artist>,
    @InjectRepository(Album)
    private albums: Repository<Album>,
    @InjectRepository(Track)
    private tracks: Repository<Track>,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favorites = await this.getFavorites();

    return favorites.toResponse();
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.tracks.findOne({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException(`Track with ${id} doesn't exists`);
    }

    const favorites = await this.getFavorites();
    const isTrackExists = !!favorites.tracks.find((item) => item.id === id);

    if (!isTrackExists) {
      favorites.tracks.push(track);

      await this.favorites.save(favorites);
    }

    return null;
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artists.findOne({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with ${id} doesn't exists`,
      );
    }

    const favorites = await this.getFavorites();
    const isArtistExists = !!favorites.artists.find((item) => item.id === id);

    if (!isArtistExists) {
      favorites.artists.push(artist);

      await this.favorites.save(favorites);
    }

    return null;
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albums.findOne({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException(`Album with ${id} doesn't exists`);
    }

    const favorites = await this.getFavorites();
    const isArtistExists = !!favorites.albums.find((item) => item.id === id);

    if (!isArtistExists) {
      favorites.albums.push(album);

      await this.favorites.save(favorites);
    }

    return null;
  }

  async deleteTrack(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    const index = favorites.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      return;
    }

    favorites.tracks.splice(index, 1);
    await this.favorites.save(favorites);

    return null;
  }

  async deleteArtist(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    const index = favorites.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      return;
    }

    favorites.artists.splice(index, 1);
    await this.favorites.save(favorites);

    return null;
  }

  async deleteAlbum(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    const index = favorites.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      return;
    }

    favorites.albums.splice(index, 1);
    await this.favorites.save(favorites);

    return null;
  }

  private async getFavorites(): Promise<Favorites> {
    const [favorites] = await this.favorites.find({
      relations: ['artist', 'album', 'track'],
    });

    if (favorites) {
      return favorites;
    }

    const newFavorites = this.favorites.create({
      artists: [],
      albums: [],
      tracks: [],
    });

    await this.favorites.save(newFavorites);

    return newFavorites;
  }
}
