import { Album } from '../../albums/entities/albums.entity';
import { Artist } from '../../artists/entities/artists.entity';
import { Track } from '../../tracks/entities/tracks.entity';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
