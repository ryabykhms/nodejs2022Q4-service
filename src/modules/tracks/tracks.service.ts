import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/tracks.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracks: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracks.create(createTrackDto);

    return this.tracks.save(newTrack);
  }

  getAll(): Promise<Track[]> {
    return this.tracks.find();
  }

  async getById(id: string): Promise<Track> {
    const track = await this.tracks.findOne({ where: { id } });

    if (track) {
      return track;
    }
  }

  async update(id: string, data: UpdateTrackDto): Promise<Track> {
    const track = await this.tracks.findOne({ where: { id } });

    if (!track) {
      return;
    }

    const updatedTrack = {
      ...track,
      ...data,
    };

    return this.tracks.save(updatedTrack);
  }

  async delete(id: string): Promise<boolean> {
    const deletedTrack = await this.tracks.delete(id);

    return !!deletedTrack.affected;
  }
}
