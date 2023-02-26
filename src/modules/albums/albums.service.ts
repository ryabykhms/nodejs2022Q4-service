import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/albums.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albums: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const createdAlbum = this.albums.create(createAlbumDto);
    return this.albums.save(createdAlbum);
  }

  getAll(): Promise<Album[]> {
    return this.albums.find();
  }

  getById(id: string): Promise<Album> {
    return this.albums.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    const album = await this.albums.findOne({ where: { id } });

    if (!album) {
      return;
    }

    const updatedAlbum = {
      ...album,
      ...data,
    };

    return this.albums.save(updatedAlbum);
  }

  async delete(id: string): Promise<boolean> {
    const deletedAlbum = await this.albums.delete(id);
    return !!deletedAlbum.affected;
  }
}
