import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesRepsonse } from './entities/favorites-response.entity';
import { FavoritesStorage } from './storages/favorites.storage';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly collection: FavoritesStorage,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  getAll(): FavoritesRepsonse {
    const favorites = this.collection.getAll();
    const tracks = favorites.tracks
      .map((id) => this.tracksService.getById(id))
      .filter((track) => !!track);

    const albums = favorites.albums
      .map((id) => this.albumsService.getById(id))
      .filter((album) => !!album);

    const artists = favorites.artists
      .map((id) => this.artistsService.getById(id))
      .filter((artist) => !!artist);

    return { albums, artists, tracks };
  }

  addTrack(id: string): void {
    const track = this.tracksService.getById(id);

    if (!track) {
      throw new UnprocessableEntityException(`Track with ${id} doesn't exists`);
    }

    this.collection.addTrack(id);

    return null;
  }

  addArtist(id: string): void {
    const track = this.artistsService.getById(id);

    if (!track) {
      throw new UnprocessableEntityException(
        `Artist with ${id} doesn't exists`,
      );
    }

    this.collection.addArtist(id);

    return null;
  }

  addAlbum(id: string): void {
    const track = this.albumsService.getById(id);

    if (!track) {
      throw new UnprocessableEntityException(`Album with ${id} doesn't exists`);
    }

    this.collection.addAlbum(id);

    return null;
  }

  deleteTrack(id: string): void {
    return this.collection.deleteTrack(id) ? null : undefined;
  }

  deleteArtist(id: string): void {
    return this.collection.deleteArtist(id) ? null : undefined;
  }

  deleteAlbum(id: string): void {
    return this.collection.deleteAlbum(id) ? null : undefined;
  }
}
