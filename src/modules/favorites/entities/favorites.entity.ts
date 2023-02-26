import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/albums.entity';
import { Artist } from '../../artists/entities/artists.entity';
import { Track } from '../../tracks/entities/tracks.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany(() => Artist, (artist) => artist.favorites)
  @JoinColumn()
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites)
  @JoinColumn()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites)
  @JoinColumn()
  tracks: Track[];

  toResponse() {
    const { artists, albums, tracks } = this;

    return { artists, albums, tracks };
  }
}
