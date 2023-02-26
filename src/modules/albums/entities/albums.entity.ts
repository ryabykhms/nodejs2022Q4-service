import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artists.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';
import { Track } from '../../tracks/entities/tracks.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ name: 'artist_id', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @ManyToOne(() => Favorites, (favorite) => favorite.albums)
  favorites: Favorites;
}
