import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/albums.entity';
import { Artist } from '../../artists/entities/artists.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4

  @Column()
  name: string;

  @Column({ name: 'artist_id', nullable: true })
  artistId: string | null;

  @Column({ name: 'album_id', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @ManyToOne(() => Favorites, (favorite) => favorite.albums)
  favorites: Favorites;
}
