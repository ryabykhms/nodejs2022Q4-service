import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/albums.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';
import { Track } from '../../tracks/entities/tracks.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToOne(() => Favorites, (favorites) => favorites.artists)
  favorites: Favorites;
}
