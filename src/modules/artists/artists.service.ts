import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artists: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artists.create(createArtistDto);
    return this.artists.save(artist);
  }

  getAll(): Promise<Artist[]> {
    return this.artists.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artists.findOne({ where: { id } });

    if (artist) {
      return artist;
    }
  }

  async update(id: string, data: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artists.findOne({ where: { id } });

    if (!artist) {
      return;
    }

    const updatedArtist = {
      ...artist,
      ...data,
    };

    return this.artists.save(updatedArtist);
  }

  async delete(id: string): Promise<boolean> {
    const deletedArtist = await this.artists.delete(id);
    return !!deletedArtist.affected;
  }
}
